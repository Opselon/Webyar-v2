import { jsx } from 'hono/jsx';
import { FC, PropsWithChildren } from 'hono/jsx';

export const Card: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div class="p-6">
        {children}
      </div>
    </div>
  );
};
