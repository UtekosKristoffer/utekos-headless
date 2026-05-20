// Path: src/app/magasinet/page.tsx
import { mockArticles } from '@/db/data/articles'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { BusFront, House, Lightbulb, Sparkles, Sun, Waves } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Activity } from 'react'

const magazineCardClass =
  'h-full overflow-hidden rounded-3xl border border-maritime-darkest/12 bg-overcast text-maritime-darkest shadow-[0_20px_60px_rgba(20,24,22,0.08)] transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-maritime-blue/30 hover:bg-overcast/80 hover:shadow-[0_28px_80px_rgba(20,24,22,0.14)]'

const magazineCategoryClass =
  'mb-2 inline-flex w-fit items-center rounded-full bg-ancient-water px-3 py-1 text-xs font-semibold tracking-normal text-maritime-darkest ring-1 ring-maritime-darkest/10'

const magazineTitleClass =
  'mb-4 font-google-sans text-2xl font-semibold tracking-tight text-maritime-darkest transition-colors group-hover:text-maritime-blue md:text-3xl'

const magazineExcerptClass = 'text-maritime-darkest/78'

const magazineCtaClass =
  'flex items-center gap-2 font-semibold text-maritime-darkest transition-colors group-hover:text-chocolate-plum'

function CategoryBadge({ category }: { category: string }) {
  const Icon =
    {
      'Tips og råd': Lightbulb,
      'Om Utekos®': Sparkles,
      'Hytteliv': House,
      'Terrasseliv': Sun,
      'Bobilliv': BusFront,
      'Båtliv': Waves
    }[category] ?? Sparkles

  return (
    <span className={magazineCategoryClass}>
      <Icon className='h-3.5 w-3.5 shrink-0 text-maritime-darkest' />
      <span>{category}</span>
    </span>
  )
}

export default function MagazinePage() {
  const featuredArticle = mockArticles[0]
  const otherArticles = mockArticles.slice(1)

  return (
    <div className='container mx-auto px-4'>
      {featuredArticle && (
        <Activity>
          <section className='mb-16'>
            <Link
              href={`/magasinet/${featuredArticle.slug}`}
              className='group block'
              data-track='MagazineFeaturedClick'
              data-track-data={JSON.stringify({
                title: featuredArticle.title,
                slug: featuredArticle.slug,
                category: featuredArticle.category
              })}
            >
              <Card
                className={`grid grid-cols-1 md:grid-cols-2 ${magazineCardClass}`}
              >
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
                  <CategoryBadge category={featuredArticle.category} />
                  <h2 className={magazineTitleClass}>
                    {featuredArticle.title}
                  </h2>
                  <p className={`mb-6 ${magazineExcerptClass}`}>
                    {featuredArticle.excerpt}
                  </p>
                  <div className={magazineCtaClass}>
                    Les hele saken
                    <ArrowRightIcon className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </div>
                </div>
              </Card>
            </Link>
          </section>
        </Activity>
      )}

      <Activity>
        <section>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {otherArticles.map(article => (
              <Link
                key={article.slug}
                href={`/magasinet/${article.slug}`}
                className='group block'
                data-track='MagazineGridClick'
                data-track-data={JSON.stringify({
                  title: article.title,
                  slug: article.slug,
                  category: article.category
                })}
              >
                <Card className={`${magazineCardClass} hover:-translate-y-1`}>
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
                    <CategoryBadge category={article.category} />
                    <h3 className='mb-2 font-google-sans text-xl font-semibold text-maritime-darkest transition-colors group-hover:text-maritime-blue'>
                      {article.title}
                    </h3>
                    <p className='text-sm text-maritime-darkest/78'>
                      {article.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </Activity>
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
