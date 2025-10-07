import { calculateDesktopLayout } from './calculateDesktopLayout'
import { CustomNode } from './CustomNode'
const desktopLayout = calculateDesktopLayout()

export function DesktopFlow() {
  const NODE_WIDTH = 280
  return (
    <div className='dot-pattern relative h-full w-full'>
      <svg viewBox='0 0 1200 900' className='h-full w-full' aria-hidden='true'>
        {desktopLayout.edges.map(edge => {
          const source = desktopLayout.nodes.find(n => n.id === edge.sourceId)!
          const target = desktopLayout.nodes.find(n => n.id === edge.targetId)!
          const sourceY = source.position.y + 40
          const sourceX = source.position.x + NODE_WIDTH / 2
          const targetY = target.position.y
          const targetX = target.position.x + NODE_WIDTH / 2
          const pathD = `M ${sourceX},${sourceY} C ${sourceX},${sourceY + 60} ${targetX},${targetY - 60} ${targetX},${targetY}`
          return <path key={edge.id} d={pathD} fill='none' style={edge.style} />
        })}
        {desktopLayout.nodes.map(node => (
          <foreignObject
            key={node.id}
            x={node.position.x}
            y={node.position.y}
            width={NODE_WIDTH}
            height={180}
          >
            {node.id === 'ute' || node.id === 'inne' || node.id === 'systemer' ?
              <div className='flex h-12 items-center justify-center rounded-lg border border-neutral-700 bg-sidebar-foreground text-center font-semibold text-foreground'>
                {node.data.label}
              </div>
            : <CustomNode data={node.data} />}
          </foreignObject>
        ))}
      </svg>
    </div>
  )
}
