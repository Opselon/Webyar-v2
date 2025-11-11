import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';

interface ButtonProps {
  href: string;
  className?: string;
  text: string;
}

export const Button: FC<ButtonProps> = ({ href, className, text }) => {
  return (
    <a href={href} class={`cta-button ${className || ''}`}>
      {text}
    </a>
  );
};
