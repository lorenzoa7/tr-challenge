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
}

export function buildTree({ locations, assets }: Props) {
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
        (asset) => asset.parentId === parentId || asset.locationId === parentId,
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
