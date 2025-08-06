import FeaturedProducts from "@/Components/Sections/SectionFeaturedProducts";
import HomePageIntro from "@/Components/Sections/SectionHomePage";
async function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <HomePageIntro />
      <FeaturedProducts />
    </main>
  );
}

export default HomePage;
