import Link from 'next/link'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          <Link href='/products'>Products</Link>
          {/* No prefetching */}
        </nav>
        {children}
      </body>
    </html>
  )
}
