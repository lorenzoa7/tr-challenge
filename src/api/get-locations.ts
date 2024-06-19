import { api } from '@/lib/axios'

export type GetLocationsRequest = {
  companyId: string
}

export type GetLocationsResponse = {
  id: string
  name: string
  parentId?: string | null
}[]

export async function getLocations({ companyId }: GetLocationsRequest) {
  const response = await api.get<GetLocationsResponse>(
    `/companies/${companyId}/locations`,
  )

  return response.data
}
