//src/components/sections/SectionHomePage.tsx
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/button";
import type { GetProductsQuery } from "@/shared/GetProductsQuery.types";

type ProductEdge = GetProductsQuery["products"]["edges"][number];
type ProductList = ProductEdge[];

interface HomePageHeroProps {
  products: ProductList;
}

async function HomePageHero({ products }: HomePageHeroProps) {
  return (
    <>
      <section className="relative bg-[#0A0A0A] mx-auto z-10 -mt-24 w-full pt-32 md:-mt-32 md:pt-48 max-w-7xl">
        <div className="container mx-auto flex flex-col items-center justify-center sm:px-8">
          <div className="grid w-full gap-4 pb-8 text-left">
            <p className="font-base text-2xl text-white md:text-3xl">Møt familien</p>
            <h1 className="animated-gradients text-4xl font-bold leading-tight md:text-5xl">Utekos™ - Banebrytende utendørsbekledning</h1>
            <p className="text-xl text-blue-400 md:text-3xl">Oppdag din nye favoritt og gjør deg klar for eventyr</p>
          </div>

          <div className="relative mt-8 w-full">
            <div className="relative mx-auto aspect-[16/9] overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,_oklch(75%_0.5_230/40%)_0%,_oklch(26%_0.12_273/60%)_100%)] backdrop-blur-lg">
              <div className="absolute inset-0">
                <Image
                  src="/images/hero-family.jpg" // <-- ERSTATT DENNE
                  alt="To personer i Utekos-soveposer nyter naturen"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="absolute -bottom-16 left-4 z-20 flex w-fit flex-col items-center sm:left-12 md:left-24">
                <Link href="/pages/utekos/storrelsesguide">
                  <Button variant="link" className="bg-orange-500 hover:bg-orange-600">
                    Se specs
                  </Button>
                </Link>
                <Image src="/images/product-sketch.png" alt="Skisse av Utekos-produkt" width={300} height={400} className="w-auto rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-intro-products" className="...">
        <div className="container mx-auto sm:px-8">
          <h2 id="featured-intro-products" className="sr-only">
            Utvalgte produkter fra Utekos-familien
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {/* Map over den mottatte prop-en */}
            {products.map(edge => (
              <ProductCard key={edge.node.id} product={edge.node} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageHero;
