import { GetAssetsResponse } from '@/api/get-assets'
import { GetLocationsResponse } from '@/api/get-locations'

export type LocationNode = {
  type: 'location'
} & GetLocationsResponse[number]

export type AssetNode = {
  type: 'asset' | 'component'
} & GetAssetsResponse[number]

export type Node = (LocationNode | AssetNode) & {
  children: Node[]
}

type Props = {
  locations: GetLocationsResponse
  assets: GetAssetsResponse
  filter: {
    searchTerm: string
    scope: 'none' | 'energy' | 'critical' | 'both'
  }
}

export function buildTree({ locations, assets, filter }: Props) {
  const { searchTerm, scope } = filter

  const isMatch = (node: Node): boolean => {
    const matchesSearchTerm =
      searchTerm === '' ||
      node.name.toLowerCase().includes(searchTerm.toLowerCase())

    const conditions = {
      energy: node.type !== 'location' && node.sensorType === 'energy',
      critical: node.type !== 'location' && node.status === 'alert',
      both:
        node.type !== 'location' &&
        node.sensorType === 'energy' &&
        node.status === 'alert',
    }

    const matchesScope = scope === 'none' || conditions[scope]

    return matchesSearchTerm && matchesScope
  }

  const buildTreeWithFilter = () => {
    const nodeMap = new Map<string, Node>()

    locations.forEach((location) => {
      nodeMap.set(location.id, { ...location, type: 'location', children: [] })
    })

    assets.forEach((asset) => {
      const type = asset.sensorType ? 'component' : 'asset'
      nodeMap.set(asset.id, { ...asset, type, children: [] })
    })

    locations.forEach((location) => {
      if (location.parentId) {
        const parent = nodeMap.get(location.parentId)
        const child = nodeMap.get(location.id)
        if (parent && child) {
          parent.children.push(child)
        }
      }
    })

    assets.forEach((asset) => {
      const parentId = asset.parentId || asset.locationId
      if (parentId) {
        const parent = nodeMap.get(parentId)
        const child = nodeMap.get(asset.id)
        if (parent && child) {
          parent.children.push(child)
        }
      }
    })

    const roots: Node[] = []
    nodeMap.forEach((node) => {
      if (node.type === 'location' && !node.parentId) {
        roots.push(node)
      } else if (
        node.type !== 'location' &&
        !node.parentId &&
        !node.locationId
      ) {
        roots.push(node)
      }
    })

    const filterNodes = (nodes: Node[]): Node[] => {
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
    }

    if (scope === 'none' && searchTerm === '') {
      return roots
    }

    return filterNodes(roots)
  }

  return buildTreeWithFilter()
}
