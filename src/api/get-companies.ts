import { apiBaseUrl, fetchRevalidationInterval } from '@/config/site'

export type GetCompaniesResponse = {
  id: string
  name: string
}[]

export async function getCompanies() {
  const response = await fetch(`${apiBaseUrl}/companies`, {
    next: { revalidate: fetchRevalidationInterval },
  })

  return response.json() as Promise<GetCompaniesResponse>
}
