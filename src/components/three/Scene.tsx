'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  useCallback, useEffect, useMemo, useRef, useState,
  type ReactNode, type RefObject,
} from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

/**
 * 배경: "자연의 데이터화" — 0/1 이진수 점군이
 *  · 라이트 → 흰 구름 (클릭/드래그로 흩어지고, 한 구름을 계속 자극하면 먹구름→비/번개)
 *  · 다크  → 카메라를 둘러싼 은하수/별 (클릭/드래그로 흩어지고, 드물게 붉은 초신성→느린 복귀)
 * 스크롤로 숫자가 사라지면 양옆 가장자리에 복잡한 와이어프레임 도형이 등장(클릭 시 0~9 숫자 폭발).
 */

type Vec2 = { x: number; y: number };
type Mode = 'cloud' | 'constellation';
type Pattern =
  | 'sphere' | 'ring' | 'cone' | 'spiral' | 'column' | 'star' | 'rain' | 'lightning';
type GeoType = 'tk1' | 'tk2' | 'tk3' | 'icosa' | 'dodeca' | 'torus';

type BurstOpts = {
  position: [number, number, number];
  colorA: string;          // 코어(뜨거움)
  colorB: string;          // 가장자리(식음) — 단색이면 A=B
  pattern: Pattern;
  life: number;
  spread: number;
};

const NR = 10;                        // 동시 ripple 슬롯
const MACRO: [number, number, number][] = [[-12, 3.2, -6], [0, 6.0, -11], [12, 1.8, -5]];
const STORM = '#3a3f4a';              // 먹구름 색
const GEOS: GeoType[] = ['tk1', 'tk2', 'tk3', 'icosa', 'dodeca', 'torus'];
const GEO_BURST: Record<GeoType, Pattern> = {
  tk1: 'spiral', tk2: 'ring', tk3: 'star', icosa: 'sphere', dodeca: 'cone', torus: 'column',
};

const PRESET = {
  cloud:         { color: '#ffffff', pointSize: 190, blending: THREE.NormalBlending },
  constellation: { color: '#cfeaff', pointSize: 135, blending: THREE.AdditiveBlending },
} as const;

/* ===== 텍스처 아틀라스 ===== */
function makeGlyphAtlas(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 50px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('0', 32, 34); ctx.fillText('1', 96, 34);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
  return t;
}
function makeDigitAtlas(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 64;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Courier New", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let d = 0; d < 10; d++) ctx.fillText(String(d), (d + 0.5) * 51.2, 34);
  const t = new THREE.CanvasTexture(c);
  t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
  return t;
}

/* ===== 난수/이징 ===== */
function gaussian(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function smoothstep(a: number, b: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
function nearestCloud(lx: number, ly: number, lz: number): number {
  let best = 0, bd = Infinity;
  for (let i = 0; i < MACRO.length; i++) {
    const dx = lx - MACRO[i][0], dy = ly - MACRO[i][1], dz = lz - MACRO[i][2];
    const dd = dx * dx + dy * dy + dz * dz;
    if (dd < bd) { bd = dd; best = i; }
  }
  return best;
}

/* ===== 점군 형상 ===== */
function buildGeometry(mode: Mode, count: number): THREE.BufferGeometry {
  const pos = new Float32Array(count * 3);
  const glyph = new Float32Array(count);
  const size = new Float32Array(count);
  const phase = new Float32Array(count);
  const bright = new Float32Array(count);
  const cloud = new Float32Array(count);
  const alive = new Float32Array(count).fill(1);

  const setBase = (i: number) => {
    glyph[i] = Math.random() < 0.5 ? 0 : 1;
    phase[i] = Math.random() * Math.PI * 2;
  };

  if (mode === 'cloud') {
    const blobs: { x: number; y: number; z: number; rx: number; ry: number; rz: number; id: number }[] = [];
    MACRO.forEach((m, ci) => {
      const puffs = 6 + Math.floor(Math.random() * 4);
      for (let p = 0; p < puffs; p++) {
        blobs.push({
          x: m[0] + gaussian() * 1.3, y: m[1] + gaussian() * 0.7, z: m[2] + gaussian() * 1.3,
          rx: 1.0 + Math.random() * 1.0, ry: 0.5 + Math.random() * 0.35, rz: 1.0 + Math.random() * 1.0,
          id: ci,
        });
      }
    });
    for (let i = 0; i < count; i++) {
      const b = blobs[Math.floor(Math.random() * blobs.length)];
      pos[i * 3] = b.x + gaussian() * b.rx;
      pos[i * 3 + 1] = b.y + gaussian() * b.ry;
      pos[i * 3 + 2] = b.z + gaussian() * b.rz;
      size[i] = 0.8 + Math.random() * 1.0;
      bright[i] = 0.30 + Math.random() * 0.28;
      cloud[i] = b.id;
      setBase(i);
    }
  } else {
    const band = Math.floor(count * 0.62);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const R = 14 + Math.random() * 16;
      const x = Math.sin(theta) * R;
      const z = -Math.cos(theta) * R;
      if (i < band) {
        const e = 0.32 * Math.sin(theta + 0.6);
        pos[i * 3] = x; pos[i * 3 + 1] = (e + gaussian() * 0.10) * R; pos[i * 3 + 2] = z;
        const major = Math.random() < 0.06;
        size[i] = major ? 1.8 + Math.random() * 1.4 : 0.7 + Math.random() * 1.0;
        bright[i] = major ? 1.0 : 0.4 + Math.random() * 0.4;
      } else {
        pos[i * 3] = x; pos[i * 3 + 1] = (Math.random() * 2 - 1) * 0.9 * R; pos[i * 3 + 2] = z;
        size[i] = 0.55 + Math.random() * 0.7;
        bright[i] = 0.25 + Math.random() * 0.25;
      }
      cloud[i] = 0;
      setBase(i);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aGlyph', new THREE.BufferAttribute(glyph, 1));
  g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  g.setAttribute('aBright', new THREE.BufferAttribute(bright, 1));
  g.setAttribute('aCloud', new THREE.BufferAttribute(cloud, 1));
  g.setAttribute('aAlive', new THREE.BufferAttribute(alive, 1));
  return g;
}

const FIELD_VERT = /* glsl */ `
  #define NR ${NR}
  uniform float uTime, uSize, uEnergy;
  uniform vec3  uRippleCenter[NR];
  uniform float uRippleStart[NR];
  uniform float uRippleStrength[NR];
  attribute float aGlyph, aSize, aPhase, aBright, aCloud, aAlive;
  varying float vGlyph, vTw, vBright, vPush, vCloud, vAlive;
  void main() {
    vGlyph = aGlyph; vBright = aBright; vCloud = aCloud; vAlive = aAlive;
    vTw = 0.7 + 0.3 * sin(uTime * (0.8 + uEnergy) + aPhase);
    vec3 p = position;
    for (int i = 0; i < NR; i++) {
      float age = uTime - uRippleStart[i];
      if (age < 0.0 || age > 1.6) continue;
      vec3 d = position - uRippleCenter[i];
      float w = exp(-dot(d, d) / (2.0 * 3.0 * 3.0));
      float env = age < 0.12 ? age / 0.12 : 1.0 - (age - 0.12) / 1.48;
      p += normalize(d + 1e-4) * w * clamp(env, 0.0, 1.0) * uRippleStrength[i];
    }
    vPush = length(p - position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uSize * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FIELD_FRAG = /* glsl */ `
  uniform sampler2D uAtlas;
  uniform vec3 uColor, uStorm;
  uniform float uOpacity;
  uniform float uCharge[3];
  varying float vGlyph, vTw, vBright, vPush, vCloud, vAlive;
  void main() {
    vec2 uv = vec2(gl_PointCoord.x * 0.5 + vGlyph * 0.5, 1.0 - gl_PointCoord.y);
    float a = texture2D(uAtlas, uv).a;
    if (a < 0.08) discard;
    float charge = vCloud < 0.5 ? uCharge[0] : (vCloud < 1.5 ? uCharge[1] : uCharge[2]);
    vec3 col = mix(uColor, uStorm, charge);
    float push = 1.0 - clamp(vPush * 0.34, 0.0, 0.85);
    gl_FragColor = vec4(col, a * uOpacity * vTw * vBright * push * vAlive);
  }
`;

/* ===== 이진수 점군 ===== */
function BinaryField({
  theme, count, energy, scroll, progress, spawnBurst,
}: {
  theme: 'light' | 'dark';
  count: number;
  energy: RefObject<number>;
  scroll: RefObject<number>;
  progress: RefObject<number>;
  spawnBurst: (o: BurstOpts) => void;
}) {
  const { camera, raycaster } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const fade = useRef(0);
  const timeRef = useRef(0);
  const charge = useRef<[number, number, number]>([0, 0, 0]);
  const ringIdx = useRef(0);
  const dragging = useRef(false);
  const lastRipple = useRef(0);
  const lastNova = useRef(-10);
  const hasDead = useRef(false);

  const [mode, setMode] = useState<Mode>(theme === 'dark' ? 'constellation' : 'cloud');
  const targetMode: Mode = theme === 'dark' ? 'constellation' : 'cloud';
  const modeRef = useRef(mode); modeRef.current = mode;

  // 윈도우 핸들러에서 쓰는 최신 참조
  const camRef = useRef(camera); camRef.current = camera;
  const rayRef = useRef(raycaster); rayRef.current = raycaster;
  const spawnRef = useRef(spawnBurst); spawnRef.current = spawnBurst;

  const atlas = useMemo(() => makeGlyphAtlas(), []);
  useEffect(() => () => atlas.dispose(), [atlas]);

  const geometry = useMemo(() => buildGeometry(mode, count), [mode, count]);
  useEffect(() => {
    charge.current = [0, 0, 0];
    hasDead.current = false;
    return () => geometry.dispose();
  }, [geometry]);

  const material = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader: FIELD_VERT,
      fragmentShader: FIELD_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: PRESET.cloud.pointSize },
        uEnergy: { value: 0 },
        uOpacity: { value: 0 },
        uAtlas: { value: atlas },
        uColor: { value: new THREE.Color(PRESET.cloud.color) },
        uStorm: { value: new THREE.Color(STORM) },
        uCharge: { value: [0, 0, 0] },
        uRippleCenter: { value: Array.from({ length: NR }, () => new THREE.Vector3()) },
        uRippleStart: { value: Array.from({ length: NR }, () => -100) },
        uRippleStrength: { value: Array.from({ length: NR }, () => 0) },
      },
    }),
    [atlas],
  );
  const matRef = useRef(material); matRef.current = material;
  useEffect(() => () => material.dispose(), [material]);

  // ripple 생성 (클릭/드래그 공용)
  const spawnRipple = useCallback((cx: number, cy: number, isDrag: boolean) => {
    const pts = pointsRef.current;
    const cam = camRef.current;
    const rc = rayRef.current;
    if (!pts) return;
    const ndc = new THREE.Vector2((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    rc.setFromCamera(ndc, cam);
    if (rc.params.Points) rc.params.Points.threshold = 0.8;
    const hits = rc.intersectObject(pts, false);
    let world: THREE.Vector3;
    if (hits.length) {
      world = hits[0].point.clone();
    } else {
      const camZ = (cam as THREE.PerspectiveCamera).position.z;
      const D = modeRef.current === 'cloud' ? camZ + 8 : camZ + 18;
      world = rc.ray.at(D, new THREE.Vector3());
    }
    const local = pts.worldToLocal(world.clone());

    const u = matRef.current.uniforms;
    const idx = ringIdx.current; ringIdx.current = (idx + 1) % NR;
    (u.uRippleCenter.value[idx] as THREE.Vector3).copy(local);
    (u.uRippleStart.value as number[])[idx] = timeRef.current;
    (u.uRippleStrength.value as number[])[idx] = 2.5;
    lastRipple.current = timeRef.current;

    if (modeRef.current === 'cloud') {
      const ci = nearestCloud(local.x, local.y, local.z);
      const ch = charge.current;
      // 먹구름 충전 속도 더 느리게
      ch[ci] = Math.min(1.2, ch[ci] + (isDrag ? 0.025 : 0.05));
      if (ch[ci] >= 1) {
        ch[ci] = 0;
        const wc = pts.localToWorld(new THREE.Vector3(MACRO[ci][0], MACRO[ci][1], MACRO[ci][2]));
        const rain = Math.random() < 0.9; // 비 90% / 번개 10%
        const c = rain ? '#bfe7ff' : '#fff3a0';
        spawnRef.current({
          position: [wc.x, wc.y, wc.z],
          colorA: c, colorB: c,
          pattern: rain ? 'rain' : 'lightning',
          life: rain ? 1.3 : 0.55,
          spread: rain ? 3.6 + Math.random() * 1.6 : 1.0,
        });
      }
    } else {
      const t = timeRef.current;
      if (Math.random() < 0.02 && t - lastNova.current > 0.8) {
        lastNova.current = t;
        spawnRef.current({
          position: [world.x, world.y, world.z],
          colorA: '#ffe066', colorB: '#ff2d2d', // 현실적 화구: 노랑 코어 → 빨강 가장자리
          pattern: Math.random() < 0.5 ? 'sphere' : 'star',
          life: 1.0,
          spread: 3.0 + Math.random() * 1.6,
        });
        // 폭발 반경 내 별 제거 (느린 복귀)
        const av = pts.geometry.getAttribute('aAlive') as THREE.BufferAttribute;
        const pp = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
        const arr = av.array as Float32Array;
        const R2 = 3.2 * 3.2;
        for (let i = 0; i < arr.length; i++) {
          const dx = pp.getX(i) - local.x, dy = pp.getY(i) - local.y, dz = pp.getZ(i) - local.z;
          if (dx * dx + dy * dy + dz * dz < R2) arr[i] = 0;
        }
        av.needsUpdate = true;
        hasDead.current = true;
      }
    }
  }, []);

  // 클릭/드래그 리스너 (숫자가 보일 때만: p < 0.85)
  useEffect(() => {
    const blocked = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest('a,button,input,textarea,nav,[role="dialog"]');
    const onDown = (e: PointerEvent) => {
      if (blocked(e.target) || progress.current >= 0.85) return;
      dragging.current = true;
      spawnRipple(e.clientX, e.clientY, false);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || progress.current >= 0.85) return;
      if (timeRef.current - lastRipple.current < 0.055) return;
      spawnRipple(e.clientX, e.clientY, true);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [spawnRipple, progress]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    timeRef.current = t;
    const preset = PRESET[mode];

    const switching = mode !== targetMode;
    fade.current = THREE.MathUtils.damp(fade.current, switching ? 0 : 1, 2.6, delta);
    if (switching && fade.current < 0.02) setMode(targetMode);

    const p = THREE.MathUtils.clamp(scroll.current / (window.innerHeight || 1), 0, 1);
    progress.current = p;
    const targetZ = THREE.MathUtils.lerp(9, 4.5, p);
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
    const scrollFade = 1 - smoothstep(0.1, 0.95, p);

    const u = material.uniforms;
    u.uTime.value = t;
    u.uOpacity.value = fade.current * scrollFade;
    u.uEnergy.value = energy.current;
    u.uSize.value = preset.pointSize * state.gl.getPixelRatio();
    (u.uColor.value as THREE.Color).set(preset.color);
    material.blending = preset.blending;

    // 구름 충전 감쇠 + uniform 반영
    const ch = charge.current;
    const cv = u.uCharge.value as number[];
    for (let c = 0; c < 3; c++) { ch[c] = Math.max(0, ch[c] - 0.04 * delta); cv[c] = ch[c]; }

    // 초신성 별 느린 복귀
    const pt = pointsRef.current;
    if (hasDead.current && pt) {
      const av = pt.geometry.getAttribute('aAlive') as THREE.BufferAttribute;
      const arr = av.array as Float32Array;
      let any = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 1) { arr[i] = Math.min(1, arr[i] + 0.035 * delta); any = true; }
      }
      av.needsUpdate = true;
      if (!any) hasDead.current = false;
    }

    if (pt) {
      if (mode === 'cloud') {
        pt.rotation.y = 0;
        pt.position.x = Math.sin(t * 0.05) * 1.3;
        pt.rotation.z = Math.sin(t * 0.07) * 0.025;
      } else {
        pt.position.x = 0; pt.rotation.z = 0;
        pt.rotation.y += delta * 0.012 * (1 + energy.current);
      }
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

/* ===== DigitBurst: 0~9 스크램블 숫자 폭발 ===== */
// 번개: 위→아래로 이어지는 지그재그 볼트 + 중간 갈래(fork). aStart=경로, aDir≈정지.
function buildLightning(dir: Float32Array, start: Float32Array, N: number) {
  const main = Math.floor(N * 0.7);
  const topY = 0.6, botY = -2.4;
  let x = (Math.random() - 0.5) * 0.3;
  for (let i = 0; i < main; i++) {
    const t = main > 1 ? i / (main - 1) : 0;
    x += (Math.random() - 0.5) * 0.5;                 // 랜덤워크
    start[i * 3] = x; start[i * 3 + 1] = topY + (botY - topY) * t; start[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    dir[i * 3] = 0; dir[i * 3 + 1] = -0.05; dir[i * 3 + 2] = 0;
  }
  // 갈래(fork): 중간 지점에서 한쪽으로 분기
  const fi = Math.floor(main * 0.5);
  let fx = start[fi * 3], fy = start[fi * 3 + 1];
  const bias = (Math.random() < 0.5 ? -1 : 1) * 0.45;
  for (let i = main; i < N; i++) {
    fx += bias + (Math.random() - 0.5) * 0.3;
    fy -= 0.32 + Math.random() * 0.22;
    start[i * 3] = fx; start[i * 3 + 1] = fy; start[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    dir[i * 3] = 0; dir[i * 3 + 1] = -0.05; dir[i * 3 + 2] = 0;
  }
}

// 패턴별 방향(aDir)·시작오프셋(aStart) 생성. 폭발류는 start=0(중심 방사),
// 비는 위에서 평행 수직 낙하, 번개는 정지형 볼트.
function makeBurst(pattern: Pattern, N: number): { dir: Float32Array; start: Float32Array } {
  const dir = new Float32Array(N * 3);
  const start = new Float32Array(N * 3);
  if (pattern === 'lightning') { buildLightning(dir, start, N); return { dir, start }; }
  for (let i = 0; i < N; i++) {
    const u = i / N;
    let x = 0, y = 0, z = 0;
    if (pattern === 'sphere') {
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), r = 0.6 + Math.random() * 0.5;
      x = Math.sin(ph) * Math.cos(th) * r; y = Math.sin(ph) * Math.sin(th) * r; z = Math.cos(ph) * r;
    } else if (pattern === 'ring') {
      const th = u * Math.PI * 2 + Math.random() * 0.2, r = 0.85 + Math.random() * 0.2;
      x = Math.cos(th) * r; y = (Math.random() - 0.5) * 0.12; z = Math.sin(th) * r * 0.5;
    } else if (pattern === 'cone') {
      const th = Math.random() * Math.PI * 2, rr = Math.random() * 0.5;
      x = Math.cos(th) * rr; z = Math.sin(th) * rr; y = 0.6 + Math.random() * 0.6;
    } else if (pattern === 'spiral') {
      const th = u * Math.PI * 6, r = 0.2 + u * 0.9;
      x = Math.cos(th) * r; z = Math.sin(th) * r; y = (u - 0.5) * 1.4;
    } else if (pattern === 'column') {
      x = (Math.random() - 0.5) * 0.25; z = (Math.random() - 0.5) * 0.25; y = (u * 2 - 1) * 1.1;
    } else if (pattern === 'star') {
      const a2 = (Math.floor(Math.random() * 5) / 5) * Math.PI * 2, r = 0.4 + Math.random() * 0.8;
      x = Math.cos(a2) * r; y = Math.sin(a2) * r; z = (Math.random() - 0.5) * 0.2;
    } else if (pattern === 'rain') {
      // 위에서 평행하게 수직 낙하 (한 점에서 퍼지지 않음)
      start[i * 3] = (Math.random() - 0.5) * 2.6;
      start[i * 3 + 1] = 0.8 + Math.random() * 0.9;
      start[i * 3 + 2] = (Math.random() - 0.5) * 1.0;
      x = (Math.random() - 0.5) * 0.12; y = -(2.0 + Math.random() * 1.6); z = 0;
    }
    dir[i * 3] = x; dir[i * 3 + 1] = y; dir[i * 3 + 2] = z;
  }
  return { dir, start };
}

const BURST_VERT = /* glsl */ `
  uniform float uTime, uStart, uSpread, uSize, uLife;
  attribute vec3 aDir;
  attribute vec3 aStart;
  attribute float aSeed, aSize;
  varying float vSeed, vDist;
  void main() {
    float age = uTime - uStart;
    float a = clamp(age / uLife, 0.0, 1.0);
    float ease = 1.0 - pow(1.0 - a, 3.0);
    vSeed = aSeed;
    vDist = clamp(length(aDir) / 1.1, 0.0, 1.0);
    vec3 pos = aStart + aDir * uSpread * ease;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uSize * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const BURST_FRAG = /* glsl */ `
  uniform sampler2D uAtlas;
  uniform vec3 uColorA, uColorB;
  uniform float uTime, uStart, uLife, uFlicker;
  varying float vSeed, vDist;
  void main() {
    float g = floor(mod(uTime * 16.0 + vSeed * 10.0, 10.0));
    vec2 uv = vec2((g + gl_PointCoord.x) / 10.0, 1.0 - gl_PointCoord.y);
    float al = texture2D(uAtlas, uv).a;
    if (al < 0.08) discard;
    float age01 = clamp((uTime - uStart) / uLife, 0.0, 1.0);
    // 중심·초반은 A(뜨거움), 멀고 늦을수록 B(식음)
    vec3 col = mix(uColorA, uColorB, clamp(vDist * 0.6 + age01 * 0.6, 0.0, 1.0));
    float flick = 0.6 + 0.4 * sin(uTime * 55.0 + vSeed * 20.0);
    float a = al * (1.0 - age01) * mix(1.0, flick, uFlicker);
    gl_FragColor = vec4(col, a);
  }
`;

function DigitBurst({
  id, position, colorA, colorB, pattern, life, spread, atlas, onDone,
}: BurstOpts & { id: number; atlas: THREE.CanvasTexture; onDone: (id: number) => void }) {
  const N = pattern === 'rain' || pattern === 'lightning' ? 30 : 22;
  const start = useRef<number | null>(null);

  const geometry = useMemo(() => {
    const { dir, start: st } = makeBurst(pattern, N);
    const seed = new Float32Array(N);
    const size = new Float32Array(N);
    for (let i = 0; i < N; i++) { seed[i] = Math.random(); size[i] = 0.8 + Math.random() * 0.8; }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    g.setAttribute('aStart', new THREE.BufferAttribute(st, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    return g;
  }, [pattern, N]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(
    () => new THREE.ShaderMaterial({
      vertexShader: BURST_VERT,
      fragmentShader: BURST_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 }, uStart: { value: 0 }, uSpread: { value: spread },
        uSize: { value: 250 }, uLife: { value: life },
        uFlicker: { value: pattern === 'lightning' ? 1 : 0 },
        uAtlas: { value: atlas },
        uColorA: { value: new THREE.Color(colorA) },
        uColorB: { value: new THREE.Color(colorB) },
      },
    }),
    [atlas, spread, life, colorA, colorB, pattern],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const u = material.uniforms;
    u.uTime.value = t;
    u.uStart.value = start.current;
    u.uSize.value = 250 * state.gl.getPixelRatio();
    if (t - start.current >= life) onDone(id);
  });

  return <points geometry={geometry} material={material} position={position} frustumCulled={false} />;
}

/* ===== 가장자리 기하도형 ===== */
function GeometryFor({ geo }: { geo: GeoType }) {
  switch (geo) {
    case 'tk1':    return <torusKnotGeometry args={[0.5, 0.18, 120, 16]} />;
    case 'tk2':    return <torusKnotGeometry args={[0.5, 0.16, 140, 16, 2, 3]} />;
    case 'tk3':    return <torusKnotGeometry args={[0.5, 0.16, 140, 16, 3, 4]} />;
    case 'icosa':  return <icosahedronGeometry args={[0.9, 1]} />;
    case 'dodeca': return <dodecahedronGeometry args={[0.85, 0]} />;
    case 'torus':  return <torusGeometry args={[0.6, 0.24, 16, 40]} />;
  }
}

type ShapeInst = { id: number; geo: GeoType; pos: [number, number, number]; scale: number; speed: number };

function ShapeMesh({
  inst, color, activeRef, onHidden,
}: {
  inst: ShapeInst; color: string; activeRef: RefObject<boolean>; onHidden: (id: number) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) return;
    const active = activeRef.current;
    const target = active ? inst.scale : 0;
    const s = THREE.MathUtils.lerp(m.scale.x, target, 0.12);
    m.scale.setScalar(s);
    m.rotation.x += delta * inst.speed * 0.5;
    m.rotation.y += delta * inst.speed * 0.7;
    if (!active && s < 0.02) onHidden(inst.id);
  });
  return (
    <Float speed={1 + inst.speed} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref} position={inst.pos} userData={{ id: inst.id }} scale={0.001}>
        <GeometryFor geo={inst.geo} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

function SideShapes({
  progress, spawnBurst, isMobile, isDark,
}: {
  progress: RefObject<number>;
  spawnBurst: (o: BurstOpts) => void;
  isMobile: boolean;
  isDark: boolean;
}) {
  const { camera, raycaster } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [shapes, setShapes] = useState<ShapeInst[]>([]);
  const shapesRef = useRef(shapes); shapesRef.current = shapes;
  const active = useRef(false);
  const spawnTimer = useRef(0);
  const idRef = useRef(0);
  const MAX = isMobile ? 2 : 4;
  const color = isDark ? '#22d3ee' : '#2563eb';

  const camRef = useRef(camera); camRef.current = camera;
  const rayRef = useRef(raycaster); rayRef.current = raycaster;
  const spawnRef = useRef(spawnBurst); spawnRef.current = spawnBurst;

  const makeShape = useCallback((): ShapeInst => {
    const cam = camRef.current as THREE.PerspectiveCamera;
    const z = -3 - Math.random() * 6;
    const dist = cam.position.z - z;
    const halfH = Math.tan((cam.fov * Math.PI) / 180 / 2) * dist;
    const halfW = halfH * cam.aspect;
    const side = Math.random() < 0.5 ? -1 : 1;
    const x = side * halfW * (0.8 + Math.random() * 0.15);
    const y = (Math.random() * 2 - 1) * halfH * 0.7;
    return {
      id: idRef.current++,
      geo: GEOS[Math.floor(Math.random() * GEOS.length)],
      pos: [x, y, z],
      scale: 0.55 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.7,
    };
  }, []);

  const removeShape = useCallback((id: number) => {
    setShapes((s) => s.filter((x) => x.id !== id));
  }, []);

  // 클릭 → 버스트 (숫자가 사라진 구간: p >= 0.9)
  useEffect(() => {
    const blocked = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest('a,button,input,textarea,nav,[role="dialog"]');
    const onDown = (e: PointerEvent) => {
      if (blocked(e.target) || progress.current < 0.9 || !groupRef.current) return;
      const rc = rayRef.current;
      const ndc = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      rc.setFromCamera(ndc, camRef.current);
      const hits = rc.intersectObjects(groupRef.current.children, true);
      for (const h of hits) {
        let o: THREE.Object3D | null = h.object;
        while (o && o.userData.id === undefined) o = o.parent;
        if (o && typeof o.userData.id === 'number') {
          const inst = shapesRef.current.find((x) => x.id === o!.userData.id);
          if (inst) {
            const wp = new THREE.Vector3();
            (o as THREE.Mesh).getWorldPosition(wp);
            spawnRef.current({
              position: [wp.x, wp.y, wp.z],
              colorA: color, colorB: color,
              pattern: GEO_BURST[inst.geo],
              life: 0.9,
              spread: 3.0 * (0.7 + Math.random() * 0.9),
            });
            removeShape(inst.id);
          }
          break;
        }
      }
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [progress, color, removeShape]);

  useFrame((_, delta) => {
    const p = progress.current;
    if (!active.current && p >= 0.92) active.current = true;
    else if (active.current && p < 0.85) active.current = false;

    if (active.current) {
      spawnTimer.current -= delta;
      if (spawnTimer.current <= 0 && shapesRef.current.length < MAX) {
        spawnTimer.current = 0.7;
        setShapes((s) => (s.length < MAX ? [...s, makeShape()] : s));
      }
    }
    // 비활성화 시엔 ShapeMesh가 스케일을 줄이고 onHidden으로 스스로 제거됨
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s) => (
        <ShapeMesh key={s.id} inst={s} color={color} activeRef={active} onHidden={removeShape} />
      ))}
    </group>
  );
}

/* ===== 포인터 에너지 / 카메라 리그 ===== */
function EnergyDecay({ energy }: { energy: RefObject<number> }) {
  useFrame((_, delta) => { energy.current = Math.max(0, energy.current - delta * 0.9); });
  return null;
}
function Rig({ children, pointer }: { children: ReactNode; pointer: RefObject<Vec2> }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (pointer.current.x * 0.35 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (pointer.current.y * 0.22 - group.current.rotation.x) * 0.04;
    }
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  const pointer = useRef<Vec2>({ x: 0, y: 0 });
  const energy = useRef<number>(0);
  const scroll = useRef<number>(0);
  const progress = useRef<number>(0);
  const burstId = useRef(0);
  const [bursts, setBursts] = useState<(BurstOpts & { id: number })[]>([]);

  const digitAtlas = useMemo(() => makeDigitAtlas(), []);
  useEffect(() => () => digitAtlas.dispose(), [digitAtlas]);

  const spawnBurst = useCallback((o: BurstOpts) => {
    setBursts((b) => [...b, { ...o, id: burstId.current++ }]);
  }, []);
  const removeBurst = useCallback((id: number) => {
    setBursts((b) => b.filter((x) => x.id !== id));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
      energy.current = Math.min(energy.current + 0.16, 1.6);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => { scroll.current = window.scrollY; };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const count = isMobile ? 1800 : 4200;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 9], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <EnergyDecay energy={energy} />
      <Rig pointer={pointer}>
        <BinaryField
          theme={theme}
          count={count}
          energy={energy}
          scroll={scroll}
          progress={progress}
          spawnBurst={spawnBurst}
        />
      </Rig>
      <SideShapes progress={progress} spawnBurst={spawnBurst} isMobile={isMobile} isDark={isDark} />
      {bursts.map((b) => (
        <DigitBurst key={b.id} {...b} atlas={digitAtlas} onDone={removeBurst} />
      ))}
    </Canvas>
  );
}
