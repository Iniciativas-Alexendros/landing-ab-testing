import { Features } from "@/components/sections/features";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { getServerVariant } from "@/lib/ab/server";

export default async function HomePage() {
  const variant = await getServerVariant();

  return (
    <>
      <Header />
      <main>
        <Hero variant={variant} />
        <Features />
      </main>
    </>
  );
}
