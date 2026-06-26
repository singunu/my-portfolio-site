'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { useTheme } from '@/context/ThemeContext';

export interface BallSkill {
  name: string;
  color: string;
}

const FOV = 70;

// 3개 레이어 반경 범위: [outer, mid, inner]
const LAYER_RANGES: [number, number][] = [
  [0.75, 1.00], // outer – 바깥 껍데기
  [0.48, 0.78], // mid   – 중간
  [0.18, 0.52], // inner – 내부
];

/* ===== 기기 tier: 화면 너비에 따른 반경·텍스트 크기 ===== */
type Tier = 'phone' | 'tablet' | 'laptop' | 'desktop';

const TIER_CFG: Record<Tier, { radius: number; text: [number, number, number] }> = {
  phone:   { radius: 4.4, text: [0.82, 0.68, 0.52] },
  tablet:  { radius: 5.2, text: [0.76, 0.63, 0.49] },
  laptop:  { radius: 5.9, text: [0.72, 0.60, 0.46] },
  desktop: { radius: 6.5, text: [0.72, 0.60, 0.46] },
};

function tierFor(w: number): Tier {
  if (w < 640) return 'phone';
  if (w < 1024) return 'tablet';
  if (w < 1280) return 'laptop';
  return 'desktop';
}

function useTier(): Tier {
  const [tier, setTier] = useState<Tier>('desktop');
  useEffect(() => {
    const update = () => setTier(tierFor(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return tier;
}

function randomCloudLayered(
  n: number,
  radius: number,
  layers: number[],
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const [lo, hi] = LAYER_RANGES[layers[i] ?? 0];
    const r = radius * (lo + (hi - lo) * Math.random());
    pts.push([
      Math.sin(phi) * Math.cos(theta) * r,
      Math.sin(phi) * Math.sin(theta) * r,
      Math.cos(phi) * r,
    ]);
  }
  return pts;
}

// 고정 카메라(z=CAM_Z) 기준, 캔버스 실측 크기에 맞춰 클라우드를 채울 스케일을 계산.
// 카메라를 움직이지 않으므로 OrbitControls(고정 반경)와 충돌하지 않는다.
const CAM_Z = 14;
function fitScaleFor(radius: number, width: number, height: number): number {
  const aspect = width / Math.max(1, height);
  const tan = Math.tan((FOV * Math.PI) / 180 / 2);
  const halfExtent = CAM_Z * tan * Math.min(aspect, 1); // 카메라~클라우드(원점) 가시 반높이/반너비 중 작은 쪽
  // 글자 overhang 포함 반경(radius*1.5)이 가시 영역을 채우는 비율.
  // 가로로 넓은 캔버스(데스크톱)일수록 더 크게 채워 구가 작아 보이지 않게 한다.
  const fill = THREE.MathUtils.clamp(0.82 + Math.max(0, aspect - 1) * 0.2, 0.82, 0.98);
  return (fill * halfExtent) / (radius * 1.5);
}

function Cloud({
  skills, stroke, isDark, radius, textSizes,
}: {
  skills: BallSkill[];
  stroke: string;
  isDark: boolean;
  radius: number;
  textSizes: [number, number, number];
}) {
  const outerRef = useRef<THREE.Group>(null);
  const midRef   = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  // 캔버스 크기에 맞춘 fit 스케일 (리사이즈/기기 변경 시 자동 갱신)
  const size = useThree((s) => s.size);
  const fitScale = useMemo(
    () => fitScaleFor(radius, size.width, size.height),
    [radius, size.width, size.height],
  );

  // 랜덤 레이어 배정 (Fisher-Yates shuffle로 균등 분포 + 무작위 순서)
  const layerAssignment = useMemo(() => {
    const arr = skills.map((_, i) => i % 3);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills.length]);

  const positions = useMemo(
    () => randomCloudLayered(skills.length, radius, layerAssignment),
    [skills.length, radius, layerAssignment],
  );

  const sprites = useMemo(() => {
    const tint = new THREE.Color(isDark ? '#ffffff' : '#0f172a');
    return skills.map((s, i) => {
      const layer = layerAssignment[i] ?? 0;
      const textSize = textSizes[layer];
      // 카테고리 색을 분위기에 맞게 부드럽게 보정 (다크=옅게 밝힘 / 라이트=살짝 깊게)
      const col = new THREE.Color(s.color).lerp(tint, isDark ? 0.22 : 0.1);
      const sp = new SpriteText(s.name, textSize, `#${col.getHexString()}`);
      sp.fontFace = 'Pretendard, sans-serif';
      sp.fontWeight = '500';
      sp.strokeWidth = 0.45;
      sp.strokeColor = stroke;
      return sp;
    });
  }, [skills, stroke, isDark, layerAssignment, textSizes]);

  useEffect(() => {
    return () => {
      sprites.forEach((sp) => {
        sp.material?.map?.dispose();
        sp.material?.dispose();
      });
    };
  }, [sprites]);

  // 레이어별 인덱스 분류
  const outerIdx = useMemo(
    () => layerAssignment.flatMap((l, i) => l === 0 ? [i] : []),
    [layerAssignment],
  );
  const midIdx = useMemo(
    () => layerAssignment.flatMap((l, i) => l === 1 ? [i] : []),
    [layerAssignment],
  );
  const innerIdx = useMemo(
    () => layerAssignment.flatMap((l, i) => l === 2 ? [i] : []),
    [layerAssignment],
  );

  // 각 레이어 독립 회전 (축·속도 상이 → 불규칙한 깊이감)
  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.10;
      outerRef.current.rotation.x += delta * 0.018;
    }
    if (midRef.current) {
      midRef.current.rotation.y -= delta * 0.17;
      midRef.current.rotation.z += delta * 0.022;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.14;
      innerRef.current.rotation.y += delta * 0.23;
    }
  });

  return (
    <group scale={fitScale}>
      <group ref={outerRef}>
        {outerIdx.map((i) => (
          <primitive key={i} object={sprites[i]} position={positions[i]} />
        ))}
      </group>
      <group ref={midRef}>
        {midIdx.map((i) => (
          <primitive key={i} object={sprites[i]} position={positions[i]} />
        ))}
      </group>
      <group ref={innerRef}>
        {innerIdx.map((i) => (
          <primitive key={i} object={sprites[i]} position={positions[i]} />
        ))}
      </group>
    </group>
  );
}

export default function SkillBall({ skills }: { skills: BallSkill[] }) {
  const { theme } = useTheme();
  const tier = useTier();
  const cfg = TIER_CFG[tier];

  const isDark = theme === 'dark';
  // 글자에 부드러운 헤일로만 주는 옅은 스트로크
  const stroke = isDark ? 'rgba(6,12,32,0.5)' : 'rgba(255,255,255,0.6)';

  return (
    <Canvas
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Cloud skills={skills} stroke={stroke} isDark={isDark} radius={cfg.radius} textSizes={cfg.text} />
      {/* 데스크톱·모바일 모두 드래그 회전 허용. 핀치/팬은 꺼서 한 손가락 회전만 사용 */}
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
    </Canvas>
  );
}
