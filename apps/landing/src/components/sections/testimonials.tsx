"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { Card, CardContent, cn } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

export function Testimonials() {
  const { testimonials } = siteConfig;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">testimonios</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {testimonials.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{testimonials.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Testimonio anterior"
              className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Testimonio siguiente"
              className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.items.map((item) => (
              <div
                key={item.author}
                className="min-w-0 shrink-0 grow-0 basis-full pr-4 sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <Quote className="h-6 w-6 text-brand" aria-hidden="true" />
                    <p className="flex-1 text-sm leading-relaxed">{item.quote}</p>
                    <div>
                      <p className="font-display text-sm font-semibold">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.items.map((item, index) => (
            <button
              key={item.author}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                index === selected ? "w-6 bg-brand" : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
