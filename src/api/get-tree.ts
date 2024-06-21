import { buildTree } from '@/functions/build-tree'
import { nextApi } from '@/lib/axios'
import { FilterSchema } from '@/schemas/filter-schema'

export type GetTreeRequest = {
  companyId: string
  filter: FilterSchema
}

export type GetTreeResponse = {
  data: ReturnType<typeof buildTree>
  message: string
}

export async function getTree({ companyId, filter }: GetTreeRequest) {
  const { searchTerm, scope } = filter
  const response = await nextApi.get<GetTreeResponse>(
    `/tree/${companyId}?search=${searchTerm}&scope=${scope}`,
  )

  return response.data.data
}
