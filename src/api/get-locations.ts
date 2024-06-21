import { apiBaseUrl, fetchRevalidationInterval } from '@/config/site'

export type GetLocationsRequest = {
  companyId: string
}

export type GetLocationsResponse = {
  id: string
  name: string
  parentId?: string | null
}[]

export async function getLocations({ companyId }: GetLocationsRequest) {
  const response = await fetch(
    `${apiBaseUrl}/companies/${companyId}/locations`,
    {
      next: { revalidate: fetchRevalidationInterval },
    },
  )

  return response.json() as Promise<GetLocationsResponse>
}
