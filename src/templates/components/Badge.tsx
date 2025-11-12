import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';

type BadgeTone = 'brand' | 'accent' | 'neutral';

interface BadgeProps extends PropsWithChildren {
  tone?: BadgeTone;
  className?: string;
}

const toneClass: Record<BadgeTone, string> = {
  brand: 'bg-brand-500/15 text-brand-600 dark:text-accent-200',
  accent: 'bg-accent-500/15 text-accent-600 dark:text-accent-200',
  neutral: 'bg-gray-200/50 text-gray-700 dark:bg-white/10 dark:text-gray-200',
};

export const Badge: FC<BadgeProps> = ({ tone = 'brand', className = '', children }) => (
  <span
    class={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
      toneClass[tone]
    } ${className}`}
  >
    {children}
  </span>
);
