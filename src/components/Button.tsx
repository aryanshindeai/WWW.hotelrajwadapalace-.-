import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}


export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  as = 'button',
  href,
  ...props
}) => {
  // Base button styles: editorial, restrained, non-pill, deliberate micro-interactions
  const baseStyles =
    'relative inline-flex items-center justify-center font-sans tracking-[0.16em] uppercase transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed group';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-[11px] py-2.5 px-5 gap-2',
    md: 'text-xs py-3.5 px-7 gap-2.5',
    lg: 'text-xs md:text-sm py-4 px-9 gap-3',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    // Primary CTA: Antique Gold accent surface, refined contrast, subtle elevation & light sweep
    primary:
      'bg-gold text-charcoal-deep font-semibold border border-gold hover:bg-gold-light hover:border-gold-light active:bg-gold-muted active:border-gold-muted shadow-sm hover:shadow-[0_4px_24px_rgba(194,166,118,0.3)] shimmer-sweep overflow-hidden',
    
    // Secondary CTA: Transparent with charcoal/ivory border and subtle gold hover state
    secondary:
      'bg-transparent text-ivory border border-ivory/20 hover:border-gold hover:text-gold active:bg-charcoal-surface/60 transition-colors duration-300',
    
    // Outline: Subtle architectural outline
    outline:
      'bg-transparent text-ivory-warm border border-charcoal-border hover:border-gold-muted hover:text-gold-light active:border-gold transition-colors duration-300',
    
    // Text CTA: Minimal underline reveal with kinetic Skiper line
    text:
      'skiper-link bg-transparent text-gold hover:text-gold-light px-0 py-1 tracking-[0.18em]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedClasses} {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};
