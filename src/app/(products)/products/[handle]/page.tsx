// src/app/products/[handle]/page.tsx

import { getProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import type { Metadata } from "next"; // Importer Metadata-typen

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return notFound();
  }

  return {
    title: product.title,
    description: product.descriptionHtml,
    openGraph: {
      title: product.title,
      description: product.descriptionHtml,
      images: [
        {
          // --- KORRIGERT LINJE ---
          url: product.media.edges[0]?.node.image.url,
          width: product.media.edges[0]?.node.image.width || 800,
          height: product.media.edges[0]?.node.image.height || 600,
          alt: product.title,
        },
      ],
    },
  };
}
// Din eksisterende Server Component
export default async function ProductPage({ params }: Props) {
  const { handle } = params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Du kan fjerne console.log herfra når du er ferdig med debugging

  return <ProductPageClient product={product} />;
}
