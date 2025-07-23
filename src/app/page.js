// src/app/page.js

import { getProducts } from "@/lib/shopify";

export default async function HomePage() {
  // Henter produktene når siden bygges på serveren
  const products = await getProducts();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Velkommen til Utekos Headless</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl text-black font-semibold mb-4">
          Produkter hentet fra Shopify:
        </h2>
        <ul className="list-disc pl-5">
          {products.map(({ node: product }) => (
            <li key={product.id} className="mb-2 text-black">
              {product.title}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
