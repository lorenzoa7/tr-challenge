import { FilterSchema } from '@/schemas/filter-schema'
import { Node, buildTree } from './build-tree'

type Props = {
  treeData: ReturnType<typeof buildTree>
  filter: FilterSchema
}

export function filterTreeData({
  treeData,
  filter,
}: Props): ReturnType<typeof buildTree> {
  const { searchTerm, scope } = filter

  function isMatch(node: Node) {
    const conditions = {
      energy: node.type !== 'location' && node.sensorType === 'energy',
      critical: node.type !== 'location' && node.status === 'alert',
      both:
        node.type !== 'location' &&
        node.sensorType === 'energy' &&
        node.status === 'alert',
    }

    const matchesSearchTerm = node.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesScope = scope === 'none' || conditions[scope]

    return matchesSearchTerm && matchesScope
  }

  function filterNodes(nodes: Node[]) {
    const filteredNodes: Node[] = []

    return nodes.reduce((acc, node) => {
      const filteredChildren = filterNodes(node.children)
      if (isMatch(node) || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children:
            filteredChildren.length > 0 ? filteredChildren : node.children,
        })
      }
      return acc
    }, [] as Node[])

    return filteredNodes
  }

  return filterNodes(treeData)
}
