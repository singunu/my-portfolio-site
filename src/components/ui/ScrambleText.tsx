'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>-_\\/[]{}=+*!?#@%';
const HANGUL = '가갸거겨고교구규그기나다라마바사아자차카타파하놀뷁됍쥬킁픙햏긿쀓';

function pick(orig: string) {
  if (orig === ' ') return ' ';
  const ko = /[가-힣㄰-㆏]/.test(orig);
  const pool = ko ? HANGUL : LATIN;
  return pool.charAt(Math.floor(Math.random() * pool.length));
}

/**
 * 호버(또는 포커스)하면 각 글자가 랜덤 문자로 잠깐 바뀌었다가
 * 순차적으로 원래 글자로 돌아오는 스크램블 효과.
 */
export default function ScrambleText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);
  const running = useRef(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  const run = useCallback(() => {
    if (running.current) return;
    running.current = true;
    const chars = Array.from(text);
    const t0 = performance.now();
    const stagger = Math.min(45, 520 / Math.max(chars.length, 1));
    const lock = chars.map((_, i) => i * stagger + Math.random() * 140);
    const maxLock = Math.max(...lock, 0);

    const tick = (now: number) => {
      const t = now - t0;
      let done = true;
      const out = chars.map((c, i) => {
        if (c === ' ') return ' ';
        if (t >= lock[i]) return c;
        done = false;
        return pick(c);
      });
      setDisplay(out.join(''));
      if (!done && t < maxLock + 250) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        running.current = false;
      }
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span className={className} style={style} onMouseEnter={run} onFocus={run}>
      {display}
    </span>
  );
}
