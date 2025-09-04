// Can use new URLSearchParams(window.location.search) in callbacks or event handlers to read search params without triggering re-renders
/**
 *
 * @see {@link https://nextjs.org/docs/app/getting-started/layouts-and-pages}
 * @returns
 */
export default function ProductPageLayout(props: LayoutProps<'/products'>) {
  return (
    <section>
      {props.children}
      {/* If you have app/products/[handle]/@analytics, it appears as a typed slot: */}
      {/* {props.analytics} */}
    </section>
  )
}