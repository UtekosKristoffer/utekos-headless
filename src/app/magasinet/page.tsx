// Path: src/app/magasinet/page.tsx

import { mockArticles } from '@/db/data/articles'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default function MagazinePage() {
  const featuredArticle = mockArticles[0]
  const otherArticles = mockArticles.slice(1)

  return (
    <div className='container mx-auto px-4'>
      {/* Featured Article Section */}
      {featuredArticle && (
        <section className='mb-16'>
          <Link
            href={`/magasinet/${featuredArticle.slug}`}
            className='group block'
          >
            <Card className='grid grid-cols-1 md:grid-cols-2 overflow-hidden border-neutral-800 bg-sidebar-foreground transition-all hover:border-neutral-700'>
              <div className='relative h-64 md:h-auto'>
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover'
                />
              </div>
              <div className='p-8 md:p-12 flex flex-col justify-center'>
                <span className='text-sm font-semibold mb-2'>
                  {featuredArticle.category}
                </span>
                <h2 className='text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors'>
                  {featuredArticle.title}
                </h2>
                <p className='text-muted-foreground mb-6'>
                  {featuredArticle.excerpt}
                </p>
                <div className='flex items-center gap-2 font-semibold text-foreground'>
                  Les hele saken
                  <ArrowRightIcon className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                </div>
              </div>
            </Card>
          </Link>
        </section>
      )}

      {/* Article Grid Section */}
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {otherArticles.map(article => (
            <Link
              key={article.slug}
              href={`/magasinet/${article.slug}`}
              className='group block'
            >
              <Card className='overflow-hidden border-neutral-800 bg-sidebar-foreground h-full transition-all hover:border-neutral-700 hover:-translate-y-1'>
                <div className='relative h-48'>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <span className='text-sm font-semibold mb-2'>
                    {article.category}
                  </span>
                  <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors'>
                    {article.title}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {article.excerpt}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function Card({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={className}>{children}</div>
}
