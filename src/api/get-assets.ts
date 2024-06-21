import { apiBaseUrl, fetchRevalidationInterval } from '@/config/site'

export type GetAssetsRequest = {
  companyId: string
}

export type GetAssetsResponse = {
  id: string
  name: string
  status?: 'operating' | 'alert' | null
  sensorType?: string | null
  sensorId?: string | null
  parentId?: string | null
  gatewayId?: string | null
  locationId?: string | null
}[]

export async function getAssets({ companyId }: GetAssetsRequest) {
  const response = await fetch(`${apiBaseUrl}/companies/${companyId}/assets`, {
    next: { revalidate: fetchRevalidationInterval },
  })

  return response.json() as Promise<GetAssetsResponse>
}
