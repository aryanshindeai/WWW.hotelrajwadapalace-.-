import React, { useEffect, useRef, useState } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'curtain' | 'fade';
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delayMs = 0,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Respect reduced-motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  const variantClass = {
    'fade-up': isVisible ? 'reveal-visible' : 'reveal-hidden',
    curtain: isVisible ? 'animate-curtain-reveal' : 'opacity-0',
    fade: isVisible ? 'opacity-100 transition-opacity duration-700 ease-out' : 'opacity-0',
  }[variant];

  return (
    <Component
      ref={elementRef}
      style={{
        transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
        animationDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      className={`${variantClass} ${className}`}
    >
      {children}
    </Component>
  );
};
