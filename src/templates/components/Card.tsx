import { jsx } from 'hono/jsx';
import { FC, JSX, PropsWithChildren } from 'hono/jsx';

type CardVariant = 'glass' | 'solid' | 'soft';

interface CardProps extends PropsWithChildren<JSX.IntrinsicElements['div']> {
  variant?: CardVariant;
  interactive?: boolean;
  className?: string;
  contentClassName?: string;
  key?: string | number;
}

const variantStyles: Record<CardVariant, string> = {
  glass: 'bg-white/80 dark:bg-surface-muted/70 backdrop-blur-lg border border-white/20 dark:border-white/5 shadow-soft',
  solid: 'bg-white dark:bg-surface-muted border border-white/10 dark:border-white/5 shadow-soft',
  soft: 'bg-surface-light/60 dark:bg-midnight/60 border border-white/20 dark:border-white/5 shadow-inner',
};

export const Card: FC<CardProps> = ({
  children,
  variant = 'glass',
  interactive = true,
  className = '',
  contentClassName,
  ...rest
}) => {
  const innerClassName =
    contentClassName ??
    'flex flex-col gap-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300';

  return (
    <div
      {...rest}
      class={`${variantStyles[variant]} relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ${
        interactive ? 'hover:-translate-y-2 hover:shadow-glass' : ''
      } ${className}`}
    >
      <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
        <div class="absolute inset-y-0 inset-inline-end-0 h-full w-1/3 bg-gradient-to-br from-brand-500/10 to-accent-400/20" />
      </div>
      <div class={`relative z-10 ${innerClassName}`}>{children}</div>
    </div>
  );
};
