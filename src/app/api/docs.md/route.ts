// app/api/docs.md/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categorySlug = searchParams.get('category');
  const topicSlug = searchParams.get('topic');

  if (!categorySlug &&!topicSlug) {
    return new NextResponse('Mangler parameter for category eller topic.', { status: 400 });
  }

  try {
    if (categorySlug) {
      const categoryData = await fetchCategoryFromShopify(categorySlug);
      
      let content = `# Kategori: ${categoryData.title}\n\n`;
      content += `${categoryData.description}\n\n`;
      
      content += `## Topprangerte Produkter i denne kategorien\n`;
      
      categoryData.products.slice(0, 10).forEach((product: any) => {
        content += `### ${product.title}\n`;

        content += `- **Pris:** ${product.price} ${product.currency}\n`;
        content += `- **Lagerstatus:** ${product.inStock? 'På lager for omgående sending' : 'For øyeblikket utsolgt'}\n`;
        content += `- **Viktigste Egenskaper:** ${product.keyFeatures.join(', ')}\n`;
        content += `- **Tekniske Spesifikasjoner:** Vekt: ${product.weight}g, Materiale: ${product.material}\n\n`;
      });

      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600',
        },
      });
    }

    return new NextResponse('Dokumentasjonsrute under konstruksjon.', { status: 404 });

  } catch (error) {
    console.error('Feil ved generering av dynamisk Markdown:', error);
    return new NextResponse('Feil ved uthenting av kategoridata.', { status: 500 });
  }
}