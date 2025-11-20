// src/components/analytics/getPageViewParams.ts
export function getPageViewParams(
  pathname: string,
  searchParams?: URLSearchParams | null
) {
  const firstSegment = pathname.split('/')[1] || ''

  const params: Record<string, any> = {
    content_name:
      typeof document !== 'undefined' ? document.title
      : pathname === '/' ? 'Forside'
      : pathname,
    content_category: firstSegment || 'home'
  }

  if (pathname === '/') {
    params.content_type = 'home'
  } else if (pathname === '/produkter') {
    params.content_type = 'product_list'
  } else if (pathname.startsWith('/produkter/')) {
    params.content_type = 'product'
  } else if (pathname.startsWith('/inspirasjon/')) {
    params.content_type = 'inspiration'
  } else if (pathname === '/inspirasjon') {
    params.content_type = 'inspiration_overview'
  } else if (pathname === '/magasinet') {
    params.content_type = 'magazine'
  } else if (pathname.startsWith('/magasinet/')) {
    params.content_type = 'article'
  } else if (pathname.startsWith('/handlehjelp/')) {
    params.content_type = 'help'
  } else if (pathname.includes('/checkout') || pathname.includes('/kasse')) {
    params.content_type = 'checkout'
  } else if (pathname.includes('/cart') || pathname.includes('/handlekurv')) {
    params.content_type = 'cart'
  } else {
    params.content_type = 'page'
  }

  if (searchParams?.get('q')) {
    params.search_string = searchParams.get('q')
  }
  if (searchParams?.get('category')) {
    params.content_category = searchParams.get('category')
  }

  return params
}
