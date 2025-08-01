import { FeaturedProductsSection } from "@/components/sections/FeaturedProducts";
import { HomePageIntro } from "@/components/sections/HomePageInto";
export default async function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <HomePageIntro />
      <FeaturedProductsSection />
    </main>
  );
}
