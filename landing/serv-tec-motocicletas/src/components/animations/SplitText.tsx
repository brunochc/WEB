import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number; // ms between items
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number; // 0..1 visible
  rootMargin?: string; // e.g. '-100px'
  textAlign?: React.CSSProperties['textAlign'];
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onLetterAnimationComplete?: () => void;
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  const style: React.CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  };
  const classes = `split-parent ${className}`;

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current as HTMLElement;

      // Split with SplitType (free alternative)
      const split = new SplitType(el, {
        types: splitType.split(',') as any,
        tagName: 'span',
      });

      // Choose targets by priority
      let targets: Element[] = [];
      const wantChars = splitType.includes('chars');
      const wantWords = splitType.includes('words');
      const wantLines = splitType.includes('lines');
      if (wantChars && split.chars?.length) targets = split.chars;
      if (!targets.length && wantWords && split.words?.length) targets = split.words;
      if (!targets.length && wantLines && split.lines?.length) targets = split.lines;
      if (!targets.length) targets = split.chars?.length ? split.chars : split.words?.length ? split.words : split.lines ?? [];

      // Ensure transform-able targets (required for translateY)
      gsap.set(targets as any, { display: 'inline-block' });

      // Prevent line breaks inside words (fixes cases like 'de' splitting across lines on mobile)
      if (split.words?.length) {
        gsap.set(split.words as any, { display: 'inline-block', whiteSpace: 'nowrap' });
      }

      // Compute ScrollTrigger start
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tween = gsap.fromTo(
        targets as any,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000, // CORRECT: delay in seconds
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => onLetterAnimationComplete?.(),
          willChange: 'transform, opacity',
          force3D: true,
        },
      );

      return () => {
        tween?.kill();
        split?.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if ((st as any).trigger === el) st.kill();
        });
      };
    },
    { scope: ref, dependencies: [text, className, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin] },
  );

  switch (tag) {
    case 'h1':
      return (
        <h1 ref={ref as any} style={style} className={classes}>
          {text}
        </h1>
      );
    case 'h2':
      return (
        <h2 ref={ref as any} style={style} className={classes}>
          {text}
        </h2>
      );
    case 'h3':
      return (
        <h3 ref={ref as any} style={style} className={classes}>
          {text}
        </h3>
      );
    case 'h4':
      return (
        <h4 ref={ref as any} style={style} className={classes}>
          {text}
        </h4>
      );
    case 'h5':
      return (
        <h5 ref={ref as any} style={style} className={classes}>
          {text}
        </h5>
      );
    case 'h6':
      return (
        <h6 ref={ref as any} style={style} className={classes}>
          {text}
        </h6>
      );
    default:
      return (
        <p ref={ref as any} style={style} className={classes}>
          {text}
        </p>
      );
  }
};

export default SplitText;
