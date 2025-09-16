import Link from 'next/link'

import { footerConfig } from '@/db/config/footer.config'

const { COMPANY_NAME, SITE_NAME } = process.env

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className='bg-background mt-auto border-t border-white/10 py-12'>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {footerConfig.map(section => (
            <div key={section.title}>
              <h3 className='mb-4 text-sm font-semibold text-foreground-on-dark'>
                {section.title}
              </h3>
              <nav aria-label={`${section.title} navigasjon`}>
                <ul className='space-y-2'>
                  {section.links.map(link => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className='text-sm text-foreground-on-dark/60 transition-colors hover:text-foreground-on-dark'
                        {...(link.external && {
                          target: '_blank',
                          rel: 'noopener noreferrer'
                        })}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
        <div className='mt-12 border-t border-white/10 pt-8 text-center'>
          <p className='text-xs text-foreground-on-dark/40'>
            &copy; {currentYear} {copyrightName}
            {copyrightName.length > 0 && !copyrightName.endsWith('.') ?
              '.'
            : ''}{' '}
            Alle rettigheter forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  )
}
