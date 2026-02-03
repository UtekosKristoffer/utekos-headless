export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between md:justify-start gap-2 border-b border-[#2C2420]/10 pb-1 last:border-0'>
      <span className='font-semibold text-[#2C2420] w-32 shrink-0'>
        {label}:
      </span>
      <span className='text-[#2C2420]/80'>{value}</span>
    </div>
  )
}
