export function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <li>
      <h4 className='mb-1 text-base font-bold text-maritime-darkest'>
        {title}
      </h4>
      <p className='text-sm leading-[1.45] text-maritime-darkest/82 md:text-base'>
        {text}
      </p>
    </li>
  )
}
