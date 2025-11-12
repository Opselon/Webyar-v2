import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';
import { Badge } from './Badge';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
}

export const SectionHeader: FC<SectionHeaderProps> = ({ eyebrow, title, description, align = 'start' }) => {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start';

  return (
    <div class={`flex w-full max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <Badge className="self-start">
          <span>{eyebrow}</span>
        </Badge>
      )}
      <h2 class="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">{title}</h2>
      {description && (
        <p class="text-sm text-gray-600 dark:text-gray-300 md:text-base">{description}</p>
      )}
    </div>
  );
};
