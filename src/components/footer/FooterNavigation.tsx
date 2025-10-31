// Path: src/components/footer/FooterNav.tsx
import { footerConfig } from '@/db/config/footer.config'
import Link from 'next/link'
import CookieSettingsButton from '@/components/cookie-consent/CookieSettingsButton'

export function FooterNavigation() {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
      {footerConfig.map(section => (
        <div key={section.title}>
          <h3 className='mb-4 text-md font-semibold text-foreground-on-dark'>
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
              {/* --- ENDRING HER --- */}
              {/* 1. Sjekk etter 'Informasjon' (ikke 'Personvern') */}
              {/* 2. Pakk knappen inn i <li> */}
              {section.title === 'Informasjon' && (
                <li className='pt-2'>
                  <CookieSettingsButton />
                </li>
              )}
              {/* --- SLUTT ENDRING --- */}
            </ul>
          </nav>
        </div>
      ))}
    </div>
  )
}
