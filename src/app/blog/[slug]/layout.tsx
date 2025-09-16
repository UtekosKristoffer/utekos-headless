// Can use new URLSearchParams(window.location.search) in callbacks or event handlers to read search params without triggering re-renders
/**
 *
 * @see {@link https://nextjs.org/docs/app/getting-started/layouts-and-pages}
 * @returns
 */

type ProductPageLayoutProps = {
  children: React.ReactNode
  analytics?: React.ReactNode
}

export default function ProductPageLayout({
  children,
  analytics
}: ProductPageLayoutProps) {
  return (
    <section>
      {children}
      {analytics}
    </section>
  )
}
