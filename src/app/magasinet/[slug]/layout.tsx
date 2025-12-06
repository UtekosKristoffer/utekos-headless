import { ArticleJsonLd } from '../ArticleJsonLd'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ slug: string }>
}

export default async function ArticleLayout({ children, params }: Props) {
  const { slug } = await params

  return (
    <>
      <ArticleJsonLd slug={slug} />
      {children}
    </>
  )
}