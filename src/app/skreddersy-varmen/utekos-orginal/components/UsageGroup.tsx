export function UsageGroup({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className='font-serif text-lg text-[#E07A5F] mb-3 border-b border-[#E07A5F]/20 pb-1'>
        {title}
      </h4>
      <ul className='list-disc list-inside space-y-1 text-[#2C2420]/80 text-sm'>
        {children}
      </ul>
    </div>
  )
}
