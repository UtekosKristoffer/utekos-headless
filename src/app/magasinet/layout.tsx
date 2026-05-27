// src/app/magasinet/layout.tsx

import type { ReactNode } from 'react'

export default function MagazineLayout({ children }: { children: ReactNode }) {
  return <div className='min-h-screen w-screen max-w-full min-w-[95%]bg-overcast'>{children}</div>
}
