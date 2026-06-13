import Image from 'next/image'
import Link from 'next/link'

const TRUST_BADGE_SRC = 'https://cdn.shopify.com/s/files/1/0634/2154/6744/files/TrustBadge.png?v=1781253329'

export function TrustSignals() {
  return (
    <div
      className='mb-6 mt-6 overflow-hidden rounded-[1.25rem]'
      role='complementary'
      aria-label='Trygghetsinformasjon'
    >
      <Link href='/frakt-og-retur' aria-label='Les mer om frakt, retur og betaling'>
        <Image
          src={TRUST_BADGE_SRC}
          alt='14 dagers åpent kjøp, rask levering med PostNord, enkelt og trygt. Betal med Vipps, Klarna, Visa, Google Pay og Apple Pay.'
          width={1200}
          height={812}
          sizes='(min-width: 1024px) 33vw, 100vw'
          className='h-auto w-full'
          quality={95}
        />
      </Link>
    </div>
  )
}
