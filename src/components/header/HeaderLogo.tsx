import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <div className='flex items-center'>
      <Link href='/' aria-label='Utekos - Til forsiden'>
        <Image
          src='/icon.png'
          alt='Utekos logo'
          width={40}
          height={40}
          priority
          className='rounded-full border border-white/10'
        />
      </Link>
    </div>
  )
}
export default HeaderLogo
