'use client';

import { useEffect, useRef } from 'react';

/**
 * 커서를 부드럽게 따라다니는 글로우. 배경 3D와 콘텐츠 사이(z-0)에 깔려
 * 마우스를 움직이면 은은한 빛 무리가 따라온다. 터치/포인터 없는 환경에서는
 * 움직임이 없으면 보이지 않는다(초기 opacity 0).
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        el.style.opacity = '1';
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-0" aria-hidden>
      <div
        ref={ref}
        className="-ml-48 -mt-48 h-96 w-96 rounded-full opacity-0 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 65%)',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
