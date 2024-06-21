import { getAssets } from '@/api/get-assets'
import { GetCompaniesResponse } from '@/api/get-companies'
import { getLocations } from '@/api/get-locations'
import { buildTree } from '@/functions/build-tree'
import { FilterSchema } from '@/schemas/filter-schema'
import { TreeNode } from './tree-node'

type Props = {
  companyId: GetCompaniesResponse[number]['id']
  filter: FilterSchema
}

export async function TreeView({ companyId, filter }: Props) {
  const [locations, assets] = await Promise.all([
    getLocations({ companyId }),
    getAssets({ companyId }),
  ])

  const tree = await buildTree({ locations, assets, filter })

  return (
    <>
      {tree.length > 0 ? (
        tree.map((node) => <TreeNode key={node.id} node={node} />)
      ) : (
        <p className="mt-2 text-center text-sm">Nenhum resultado encontrado.</p>
      )}
    </>
  )
}
