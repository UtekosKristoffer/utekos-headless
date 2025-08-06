// src/app/products/[handle]/page.tsx

import getProductByHandle from "@/Lib/Server/Queries/getProductByHandle";
import { notFound } from "next/navigation";
import ProductPageClient from "@/Components/Products/ProductPageClient";
import type { Metadata } from "next"; // Importer Metadata-typen

type Props = {
  params: { handle: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle } = await props.params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return {
    title: product.title,
    description: product.descriptionHtml,
    openGraph: {
      title: product.title,
      description: product.descriptionHtml,
      images: [
        {
          url: product.media.edges[0]?.node.image.url,
          width: product.media.edges[0]?.node.image.width || 800,
          height: product.media.edges[0]?.node.image.height || 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage(props: Props) {
  const { handle } = await props.params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
