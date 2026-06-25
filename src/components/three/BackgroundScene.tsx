'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SceneFallback from './SceneFallback';

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/**
 * 전역 배경 3D 레이어. 콘텐츠 뒤(-z-10)에 고정되며 포인터 이벤트를 통과시켜
 * 스크롤/클릭을 막지 않는다. prefers-reduced-motion 이거나 마운트 전에는
 * 정적 폴백을 보여준다.
 */
export default function BackgroundScene() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnable3D(!reduced);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* 라이트 모드 하늘. 대기층 + 태양광 헤이즈 + 지평선 빛으로 자연스러운 낮 하늘을 구성.
          하단도 하얀색이 아닌 옅은 하늘색을 유지. 다크 전환 시 opacity로 부드럽게 사라진다. */}
      <div
        className="absolute inset-0 opacity-100 transition-opacity duration-700 ease-out dark:opacity-0"
        style={{
          background: [
            'radial-gradient(110% 75% at 80% 4%, rgba(255,255,255,0.50), rgba(255,255,255,0) 36%)', // 태양광 헤이즈
            'radial-gradient(120% 70% at 50% 116%, #d6ecfb 0%, rgba(214,236,251,0) 60%)',           // 지평선 빛(옅은 하늘색)
            'linear-gradient(to bottom, #5fa6e6 0%, #86bff0 40%, #aed5f4 72%, #cfe7fa 100%)',        // 대기층(하단도 하늘색)
          ].join(','),
        }}
      />
      {enable3D ? <Scene /> : <SceneFallback />}
    </div>
  );
}
