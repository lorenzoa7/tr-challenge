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

  function isMatch(node: Node) {
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

  function buildTree(
    locations: Props['locations'],
    assets: Props['assets'],
  ): Node[] {
    function findChildren(parentId: string | null): Node[] {
      const locationChildren = locations
        .filter((location) => location.parentId === parentId)
        .map((location) => ({
          ...location,
          type: 'location' as const,
          children: findChildren(location.id),
        }))

      const assetChildren = assets
        .filter(
          (asset) =>
            asset.parentId === parentId || asset.locationId === parentId,
        )
        .map((asset) => ({
          ...asset,
          type: asset.sensorType ? ('component' as const) : ('asset' as const),
          children: findChildren(asset.id),
        }))

      return [...locationChildren, ...assetChildren]
    }

    const rootLocations = locations
      .filter((location) => !location.parentId)
      .map((location) => ({
        ...location,
        type: 'location' as const,
        children: findChildren(location.id),
      }))

    const rootAssets = assets
      .filter((asset) => !asset.locationId && !asset.parentId)
      .map((asset) => ({
        ...asset,
        type: asset.sensorType ? ('component' as const) : ('asset' as const),
        children: findChildren(asset.id),
      }))

    return [...rootLocations, ...rootAssets]
  }

  function filterNodes(nodes: Node[]) {
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

  const treeData = buildTree(locations, assets)

  if (scope === 'none' && searchTerm === '') {
    return treeData
  }

  return filterNodes(treeData)
}
