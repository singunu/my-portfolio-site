'use client';

/**
 * 3D 씬을 띄울 수 없는 환경(서버 렌더 로딩 중, prefers-reduced-motion,
 * WebGL 미지원/저사양 모바일)을 위한 정적 그라데이션 폴백.
 */
export default function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full blur-3xl sm:h-96 sm:w-96"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 h-72 w-72 rounded-full blur-3xl sm:h-[28rem] sm:w-[28rem]"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-3) 35%, transparent), transparent 70%)' }}
      />
    </div>
  );
}
