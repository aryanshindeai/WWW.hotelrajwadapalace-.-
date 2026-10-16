import React from 'react';

export interface SplitTextRevealProps {
  text: string;
  triggerKey?: string | number;
  className?: string;
  wordClassName?: string;
  baseDelayMs?: number;
  staggerMs?: number;
  as?: React.ElementType;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  triggerKey = 'default',
  className = '',
  wordClassName = '',
  baseDelayMs = 100,
  staggerMs = 60,
  as: Component = 'span',
}) => {
  const words = text.split(' ');

  return (
    <Component
      key={triggerKey}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={`${triggerKey}-${idx}-${word}`}
          className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0"
          aria-hidden="true"
        >
          <span
            style={{
              animationDelay: `${baseDelayMs + idx * staggerMs}ms`,
            }}
            className={`animate-word-rise ${wordClassName}`}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
