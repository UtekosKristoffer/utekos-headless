// Fil: src/components/product/ProductGrid.tsx
import { ProductCard } from "./product/ProductCard";
import type { ShopifyProduct } from "@/types/shopify";

interface ProductGridProps {
  products: ShopifyProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p>Fant ingen produkter.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
