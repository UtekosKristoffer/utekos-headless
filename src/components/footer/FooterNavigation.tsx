// Path: src/components/footer/FooterNavigation.tsx

import { footerConfig } from '@/db/config/footer.config'
import Link from 'next/link'
import CookieSettingsButton from '@/components/cookie-consent/CookieSettingsButton'
import { CertificationSmall } from '@/components/common/CertificationSmall'
import { Activity } from 'lucide-react'
export function FooterNavigation() {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-5'>
      <div className='flex justify-center md:justify-start'>
        <Activity>
          <CertificationSmall />
        </Activity>
      </div>
      {/* 2. Dynamiske kolonner fra config */}
      {footerConfig.map(section => (
        <div key={section.title}>
          <h3 className='mb-4 text-md font-semibold text-foreground-on-dark'>
            {section.title}
          </h3>
          <nav aria-label={`${section.title} navigasjon`}>
            <ul className='space-y-2'>
              <Activity>
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
                {section.title === 'Informasjon' && <CookieSettingsButton />}
              </Activity>
            </ul>
          </nav>
        </div>
      ))}
    </div>
  )
}
