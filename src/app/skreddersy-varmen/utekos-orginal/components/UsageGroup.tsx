export function UsageGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className='mb-3 border-b border-maritime-darkest/20 pb-1   text-lg text-maritime-darkest'>
        {title}
      </h4>
      <ul className='list-inside list-disc space-y-1 text-sm text-maritime-darkest/82'>{children}</ul>
    </div>
  )
}
