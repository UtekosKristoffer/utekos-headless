import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <div className='flex items-center'>
      <Link href='/' aria-label='Utekos - Til forsiden'>
        <Image
          src='/icon.png'
          alt='Utekos logo'
          width={45}
          height={45}
          priority
          className='rounded-full ring ring-white/30'
        />
      </Link>
    </div>
  )
}
export default HeaderLogo
