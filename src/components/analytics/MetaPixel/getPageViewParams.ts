// Path: src/components/analytics/MetaPixel/getPageViewParams.ts
export function getPageViewParams(
  pathname: string,
  searchParams?: URLSearchParams | null
) {
  const params: Record<string, any> = {
    content_name:
      typeof document !== 'undefined' ? document.title
      : pathname === '/' ? 'Forside'
      : pathname,
    content_category: pathname.split('/')[1] || 'home'
  }
  if (pathname.startsWith('/produkt')) {
    params.content_type = 'product'
  } else if (pathname === '/produkter') {
    params.content_type = 'product_group'
  } else if (pathname === '/') {
    params.content_type = 'home'
  } else if (pathname.includes('/checkout') || pathname.includes('/kasse')) {
    params.content_type = 'checkout'
  } else if (pathname.includes('/cart') || pathname.includes('/handlekurv')) {
    params.content_type = 'cart'
  } else {
    params.content_type = pathname.split('/')[1] || 'page'
  }
  if (searchParams?.get('q')) {
    params.search_string = searchParams.get('q')
  }
  if (searchParams?.get('category')) {
    params.content_category = searchParams.get('category')
  }
  return params
}
