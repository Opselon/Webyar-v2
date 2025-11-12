import { jsx } from 'hono/jsx';
import { FC, JSX } from 'hono/jsx';
import { Icon } from './Icon';

interface MetricCardProps {
  icon: Parameters<typeof Icon>[0]['name'];
  label: string;
  value: string;
  trend?: string;
  key?: string | number;
}

export const MetricCard: FC<MetricCardProps> = ({ icon, label, value, trend }) => {
  return (
    <div class="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-glass dark:border-white/10 dark:bg-surface-muted/80">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
      <div class="relative z-10 flex items-center justify-between">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 shadow-inner dark:text-accent-200">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        {trend && <span class="text-xs font-semibold text-accent-500 dark:text-accent-200">{trend}</span>}
      </div>
      <p class="relative z-10 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
      <p class="relative z-10 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};
