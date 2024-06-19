import { api } from '@/lib/axios'

export type GetAssetsRequest = {
  companyId: string
}

export type GetAssetsResponse = {
  id: string
  name: string
  sensorId: string
  status?: 'operating' | 'alert' | null
  sensorType?: string | null
  parentId?: string | null
  gatewayId?: string | null
  locationId?: string | null
}[]

export async function getAssets({ companyId }: GetAssetsRequest) {
  const response = await api.get<GetAssetsResponse>(
    `/companies/${companyId}/assets`,
  )

  return response.data
}
