'use client';

import dynamic from 'next/dynamic';
import type { BallSkill } from './SkillBall';

const SkillBall = dynamic(() => import('./SkillBall'), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export default function SkillBallCanvas({ skills }: { skills: BallSkill[] }) {
  return <SkillBall skills={skills} />;
}
