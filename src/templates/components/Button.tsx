import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<{
  href?: string;
  text?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: JSX.Element;
  id?: string;
  disabled?: boolean;
}>;

const baseClass =
  'group inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 text-white shadow-neon hover:-translate-y-1 hover:shadow-glass',
  secondary:
    'border border-brand-200/60 bg-white/70 text-brand-700 shadow-soft hover:-translate-y-1 hover:border-brand-300 hover:bg-white dark:border-white/10 dark:bg-surface-muted dark:text-white',
  ghost:
    'text-brand-600 hover:-translate-y-1 hover:text-brand-700 dark:text-accent-200 dark:hover:text-white',
};

const arrowClass: Record<ButtonVariant, string> = {
  primary: 'text-white/80',
  secondary: 'text-brand-600 dark:text-accent-100',
  ghost: 'text-brand-600 dark:text-accent-100',
};

export const Button: FC<ButtonProps> = ({
  href,
  text,
  variant = 'primary',
  className = '',
  type = 'button',
  icon,
  id,
  disabled = false,
  children,
}) => {
  const content = (
    <span class="flex items-center gap-2">
      {icon && <span class="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      <span data-button-label>{text || children}</span>
      <span class={`text-lg font-bold transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${arrowClass[variant]}`}>
        →
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} class={`${baseClass} ${variantClasses[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button id={id} type={type} class={`${baseClass} ${variantClasses[variant]} ${className}`} disabled={disabled}>
      {content}
    </button>
  );
};
