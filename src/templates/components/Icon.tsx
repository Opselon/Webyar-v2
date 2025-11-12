import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';

type IconName =
  | 'radar'
  | 'shield'
  | 'globe'
  | 'code'
  | 'stack'
  | 'analytics'
  | 'speed'
  | 'growth'
  | 'network'
  | 'automation';

interface IconProps {
  name: IconName;
  className?: string;
}

const iconBase = 'h-7 w-7';

const icons: Record<IconName, JSX.Element> = {
  radar: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <circle cx="12" cy="12" r="9" class="opacity-30" />
      <path d="M12 3v9l6 6" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path
        d="M12 3 4.5 6v6c0 4.385 2.865 8.371 7.2 9.6 4.335-1.229 7.2-5.215 7.2-9.6V6L12 3Z"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-30"
      />
      <path d="m9.75 12 1.875 1.875L14.25 11.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <circle cx="12" cy="12" r="9" class="opacity-30" />
      <path d="M3 12h18M12 3c3 4 3 14 0 18m0-18c-3 4-3 14 0 18" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  code: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path d="m8.25 15-3-3 3-3m7.5 6 3-3-3-3" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m14.25 5.25-4.5 13.5" stroke-linecap="round" />
    </svg>
  ),
  stack: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" stroke-linejoin="round" />
      <path d="m3 12 9 4.5 9-4.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-60" />
      <path d="m3 16.5 9 4.5 9-4.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-40" />
    </svg>
  ),
  analytics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path d="M4.5 19.5h15" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.5 19.5V9.75m4.5 9.75v-6m4.5 6V5.25" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="16.5" cy="5" r="1.5" fill="currentColor" class="opacity-60" />
    </svg>
  ),
  speed: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path
        d="M12 4.5A7.5 7.5 0 1 0 19.5 12"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-30"
      />
      <path d="M12 12l4.5-4.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  growth: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path d="M3 19.5h18" stroke-linecap="round" />
      <path d="M6 15.75 10.5 9l3 3 4.5-6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 6h3v3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  network: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <circle cx="12" cy="7" r="3" />
      <circle cx="6" cy="17" r="3" class="opacity-40" />
      <circle cx="18" cy="17" r="3" class="opacity-40" />
      <path d="m8.25 14.25 2.25-2.25m3 0 2.25 2.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  automation: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class={iconBase}>
      <path d="M6.75 19.5h10.5" stroke-linecap="round" />
      <path d="M12 4.5c2.485 0 4.5 2.015 4.5 4.5 0 1.651-.89 3.323-2.25 4.5H9.75C8.39 12.323 7.5 10.651 7.5 9c0-2.485 2.015-4.5 4.5-4.5Z" />
      <path d="M9 13.5h6v3H9z" stroke-linejoin="round" class="opacity-50" />
    </svg>
  ),
};

export const Icon: FC<IconProps> = ({ name, className = '' }) => {
  return <span class={`inline-flex items-center justify-center text-brand-600 dark:text-accent-200 ${className}`}>{icons[name]}</span>;
};
