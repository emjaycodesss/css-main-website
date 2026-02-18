import React from 'react';

/**
 * Button component interface
 * @interface ButtonProps - Props for the Button component
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size variant: sm (36px), md (40px default), lg (48px) */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant of the button */
  variant?: 'primary' | 'glass' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  size = 'md', 
  variant = 'primary', 
  className = '', 
  children, 
  disabled,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-[var(--font-sans)] font-medium text-[0.9375rem] leading-none tracking-[0.01em]
    cursor-pointer
    transition-all duration-150 ease-out
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)]
    disabled:opacity-35 disabled:cursor-not-allowed disabled:grayscale-[0.3] disabled:transform-none
  `.trim().replace(/\s+/g, ' ');
  
  /** Size-specific classes */
  const sizeClasses: Record<string, string> = {
    sm: 'h-9 px-4 text-[0.8125rem] rounded-[9999px]',
    md: 'h-10 px-6 text-[0.9375rem] rounded-[9999px]',
    lg: 'h-12 px-8 text-[1rem] rounded-[9999px]'
  };
  
  /** Variant-specific classes - MINIMAL hover, NO glow, NO scale */
  const variantClasses: Record<string, string> = {
    primary: `
      bg-gradient-to-br from-[#6b5b95] to-[#8b7ee6]
      text-white
      border border-[rgba(168,156,200,0.2)]
      shadow-[0_2px_6px_rgba(124,111,214,0.2)]
      hover:brightness-[1.08]
      hover:shadow-[0_3px_8px_rgba(124,111,214,0.25)]
      hover:border-[rgba(168,156,200,0.3)]
      active:shadow-[0_1px_3px_rgba(124,111,214,0.2)] active:brightness-95
    `.trim().replace(/\s+/g, ' '),
    
    glass: `
      bg-[rgba(124,111,214,0.12)]
      text-[#b5a8d4]
      border border-[rgba(139,126,230,0.25)]
      hover:bg-[rgba(124,111,214,0.18)] hover:border-[rgba(139,126,230,0.35)]
      active:bg-[rgba(124,111,214,0.22)] active:brightness-95
    `.trim().replace(/\s+/g, ' '),
    
    outline: `
      bg-transparent
      text-[#b5a8d4]
      border border-[#6b5b95]
      hover:bg-[rgba(107,91,149,0.12)] hover:border-[#7d6ba8]
      active:bg-[rgba(107,91,149,0.18)] active:brightness-95
    `.trim().replace(/\s+/g, ' '),
    
    ghost: `
      bg-transparent
      text-[#b8b4c9]
      border-none
      rounded-xl
      hover:bg-[rgba(168,156,200,0.08)] hover:text-white
      active:bg-[rgba(168,156,200,0.12)]
    `.trim().replace(/\s+/g, ' ')
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
