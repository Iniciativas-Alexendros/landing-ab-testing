import { Card, CardContent, CardHeader, CardTitle } from "@landing/ui";

import { Icon } from "@/components/icon";
import { FadeInWhenVisible } from "@/components/motion/fade-in-when-visible";
import { siteConfig } from "@/config/site.config";

export function Features() {
  const { features } = siteConfig;

  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">características</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{features.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature, index) => (
            <FadeInWhenVisible key={feature.title} delay={index * 0.05}>
              <Card className="h-full hover:shadow-md">
                <CardHeader>
                  <span className="mb-2 grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-accent-foreground">
                    <Icon name={feature.icon} className="h-5 w-5" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
