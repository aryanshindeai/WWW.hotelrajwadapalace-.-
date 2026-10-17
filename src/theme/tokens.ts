/**
 * HOTEL RAJWADA PALACE — DESIGN SYSTEM TOKENS
 * Immutable single source of truth for colors, typography, spacing, and transitions.
 */

export const colors = {
  charcoal: {
    deep: '#101317',
    DEFAULT: '#0F1012',
    surface: '#17181B',
    border: '#24262B',
    muted: '#2E3138',
  },
  ivory: {
    light: '#FDFAF5',
    DEFAULT: '#F6F0E7',
    warm: '#EFE9DF',
    muted: '#D8D4CC',
  },
  gold: {
    light: '#D8BD8A',
    DEFAULT: '#C7A66B',
    muted: '#9B8053',
    dark: '#7A6540',
  },
  neutral: {
    sand: '#8E8A82',
    stone: '#5C5852',
  },
} as const;

export const typography = {
  fonts: {
    serif: '"Cormorant Garamond", Georgia, serif',
    cinzel: '"Cinzel", "Cormorant Garamond", Georgia, serif',
    sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  tracking: {
    tighter: '-0.03em',
    tight: '-0.015em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.12em',
    widest: '0.22em',
  },
} as const;

export const spacing = {
  container: {
    mobile: '1.25rem', // 20px
    tablet: '2.5rem',  // 40px
    desktop: '4rem',   // 64px
    wide: '6rem',      // 96px
  },
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    wide: '1600px',
  },
} as const;

export const motionTokens = {
  ease: {
    editorial: 'cubic-bezier(0.25, 1, 0.5, 1)',
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    subtle: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  duration: {
    fast: '200ms',
    subtle: '350ms',
    reveal: '700ms',
    cinematic: '1200ms',
  },
} as const;
