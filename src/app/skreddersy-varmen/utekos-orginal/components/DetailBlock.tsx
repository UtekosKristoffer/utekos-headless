export function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <li>
      <h4 className='font-bold text-base mb-1 text-[#2C2420]'>{title}</h4>
      <p className='text-[#2C2420]/80 leading-relaxed text-sm md:text-base'>
        {text}
      </p>
    </li>
  )
}
