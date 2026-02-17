'use client'

import { nodes, edges } from '../../../utils/initialElements'
import { CustomerNetworkView } from './CustomerNetworkView'

export function CustomerNetwork() {
  const centerNode = nodes.find(node => node.type === 'center')

  return (
    <CustomerNetworkView nodes={nodes} edges={edges} centerNode={centerNode} />
  )
}
