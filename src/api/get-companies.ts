import { api } from '@/lib/axios'

export type GetCompaniesResponse = {
  id: string
  name: string
}[]

export async function getCompanies() {
  const response = await api.get<GetCompaniesResponse>('/companies')

  return response.data
}
