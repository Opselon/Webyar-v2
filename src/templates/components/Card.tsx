import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';

interface CardProps {
  className?: string;
}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, className }) => {
  return (
    <div class={`card ${className || ''}`}>
      {children}
    </div>
  );
};
