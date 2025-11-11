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
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', !expanded);
      accordionContent.style.maxHeight = expanded ? null : accordionContent.scrollHeight + 'px';
    });
  });
`;

export const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <div class="accordion">
      {items.map((item, index) => (
        <div class="accordion-item" key={index}>
          <button
            class="accordion-button"
            aria-expanded="false"
            aria-controls={`accordion-content-${index}`}
            id={`accordion-button-${index}`}
          >
            {item.question}
          </button>
          <div
            class="accordion-content"
            id={`accordion-content-${index}`}
            role="region"
            aria-labelledby={`accordion-button-${index}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
      <script dangerouslySetInnerHTML={{ __html: accordionScript }} />
    </div>
  );
};
