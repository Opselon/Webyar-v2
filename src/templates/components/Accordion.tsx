import { jsx } from 'hono/jsx';
import { FC } from 'hono/jsx';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const accordionScript = `
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      const buttons = accordion.querySelectorAll('[data-accordion-trigger]');
      buttons.forEach((button) => {
        const contentId = button.getAttribute('aria-controls');
        if (!contentId) return;
        const content = document.getElementById(contentId);
        if (!content) return;
        button.addEventListener('click', () => {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', (!isExpanded).toString());
          content.style.maxHeight = isExpanded ? '0px' : content.scrollHeight + 'px';
          content.classList.toggle('opacity-100');
        });
        // Initialize collapsed state
        content.style.maxHeight = '0px';
      });
    });
  });
`;

export const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <div class="space-y-4" data-accordion>
      {items.map((item, index) => (
        <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/60 shadow-soft dark:bg-surface-muted/80" key={index}>
          <button
            class="flex w-full items-center justify-between gap-6 px-6 py-4 text-start text-sm font-semibold text-gray-900 transition hover:bg-white/80 dark:text-white dark:hover:bg-white/10"
            aria-expanded="false"
            aria-controls={`accordion-content-${index}`}
            id={`accordion-trigger-${index}`}
            data-accordion-trigger
          >
            <span>{item.question}</span>
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                class="h-4 w-4"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
          </button>
          <div
            class="px-6 pb-6 text-sm text-gray-600 opacity-0 transition-all duration-500 ease-in-out dark:text-gray-300"
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-trigger-${index}`}
          >
            <p class="leading-7">{item.answer}</p>
          </div>
        </div>
      ))}
      <script dangerouslySetInnerHTML={{ __html: accordionScript }} />
    </div>
  );
};
