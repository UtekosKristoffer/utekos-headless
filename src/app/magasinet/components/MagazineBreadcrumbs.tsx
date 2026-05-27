// src/app/magasinet/components/MagazineBreadcrumbs.tsx

import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { MagazineArticle } from '../types'

type Props = {
  article?: MagazineArticle
}

export function MagazineBreadcrumbs({ article }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Hjem</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          {article ?
            <BreadcrumbLink asChild>
              <Link href='/magasinet'>Magasinet</Link>
            </BreadcrumbLink>
          : <BreadcrumbPage>Magasinet</BreadcrumbPage>}
        </BreadcrumbItem>

        {article && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
