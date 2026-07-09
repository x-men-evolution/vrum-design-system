import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export const BUTTON_VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-inter transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/45 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-action-default text-text-inverse hover:bg-action-hover active:bg-action-pressed disabled:bg-action-disabled disabled:text-text-disabled',
  secondary:
    'bg-bg-surface text-secondary-800 hover:bg-bg-subtle active:bg-secondary-300 disabled:bg-action-disabled disabled:text-text-disabled',
  outline:
    'border-[1.5px] border-border-brand text-text-brand bg-transparent hover:bg-action-ghost-hover active:bg-action-ghost-pressed disabled:opacity-40',
  ghost:
    'text-text-brand bg-transparent hover:bg-action-ghost-hover active:bg-action-ghost-pressed disabled:opacity-40',
  destructive:
    'bg-action-destructive-default text-text-inverse hover:bg-action-destructive-hover active:bg-action-destructive-pressed disabled:bg-action-disabled disabled:text-text-disabled'
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-14 px-7 text-titleMedium',
  md: 'h-11 px-5 text-labelLarge',
  sm: 'h-8 px-3 text-labelMedium'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'lg', className, children, ...props }, ref) => {
    const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
