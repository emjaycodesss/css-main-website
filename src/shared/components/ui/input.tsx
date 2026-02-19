import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Design-system input wrapper: label + native input with error state.
 * Uses tokens from index.css (--color-*, --text-*, --radius-md).
 * WCAG: label associated via htmlFor/id; placeholder is supplementary.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible label (required for a11y; not placeholder-only) */
  label: string;
  /** Unique id for input (links label); defaults to id from props or generated */
  id?: string;
  /** Inline validation error message */
  error?: string;
  /** Optional description for screen readers */
  ariaDescription?: string;
}

const inputBaseClasses =
  'w-full h-10 px-4 bg-[rgba(37,40,55,0.95)] border rounded-[12px] text-white font-[var(--font-sans)] text-[var(--text-body)] placeholder-[rgba(184,180,201,0.5)] cursor-text transition-[border-color] duration-150 focus:outline-none focus:border-[#8b7ee6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)] disabled:opacity-35 disabled:cursor-not-allowed';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id: idProp, error, className, ariaDescription, ...props }, ref) => {
    const id = idProp ?? `input-${React.useId()}`;
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-[var(--text-subhead)] text-white mb-2 cursor-default"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : ariaDescription ? `${id}-desc` : undefined}
          aria-errormessage={error ? `${id}-error` : undefined}
          className={cn(
            inputBaseClasses,
            error ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]',
            className
          )}
          {...props}
        />
        {ariaDescription && !error && (
          <span id={`${id}-desc`} className="sr-only">
            {ariaDescription}
          </span>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-2 text-[var(--text-caption-1)] text-[#f87171] cursor-default" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
