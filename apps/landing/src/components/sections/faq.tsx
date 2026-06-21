import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

export function Faq() {
  const { faq } = siteConfig;

  return (
    <section id="faq" className="border-t">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="eyebrow mb-3">preguntas</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {faq.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{faq.subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
