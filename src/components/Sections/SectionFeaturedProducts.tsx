import ProductCard from "@/Components/Products/ProductCard";
import Link from "next/link";
import useProducts from "@/Hooks/useProducts";

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts();
  if (isLoading) return <div>Laster...</div>;
  if (error) return <div>Feil: {error.message}</div>;

  if (!products || products.length === 0) {
    return (
      <section className="container mx-auto p-8 text-center">
        <p>Fant ingen produkter å vise.</p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="featured-products-heading"
      className="container mx-auto p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 id="featured-products-heading" className="text-3xl font-bold">
          Utvalg
        </h2>
        <Link
          href="/products"
          className="text-sm font-medium text-foreground-on-dark/80 hover:text-foreground-on-dark"
        >
          Se alle produkter →
        </Link>
      </div>

      <div
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
