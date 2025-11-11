import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';

interface ButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ href, text, className = '' }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const primaryClasses = 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
  const secondaryClasses = 'text-gray-800 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-gray-500';

  const finalClassName = `${baseClasses} ${className.includes('secondary') ? secondaryClasses : primaryClasses} ${className}`;

  return (
    <a href={href} class={finalClassName}>
      {text}
    </a>
  );
};
