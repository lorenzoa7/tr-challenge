'use client'

import { getAssets } from '@/api/get-assets'
import { GetCompaniesResponse } from '@/api/get-companies'
import { getLocations } from '@/api/get-locations'
import { buildTree } from '@/functions/build-tree'
import { useQueries } from '@tanstack/react-query'
import { TreeNode } from './tree-node'
import { TreeSkeleton } from './tree-skeleton'

type Props = {
  company: GetCompaniesResponse[number]
}

export function TreeView({ company }: Props) {
  const { data, isPending } = useQueries({
    queries: [
      {
        queryKey: ['locations', company.id],
        queryFn: () => getLocations({ companyId: company.id }),
      },
      {
        queryKey: ['assets', company.id],
        queryFn: () => getAssets({ companyId: company.id }),
      },
    ],
    combine: (results) => {
      return {
        data: {
          locations: results[0].data,
          assets: results[1].data,
        },
        isPending: results.some((result) => result.isPending),
      }
    },
  })

  const treeData =
    data.locations && data.assets
      ? buildTree({ locations: data.locations, assets: data.assets })
      : undefined

  return (
    <aside className="min-w-64 resize-x overflow-auto border-2 border-slate-200 p-2">
      <div className="max-h-[calc(100vh-200px)] w-[33rem] overflow-x-auto">
        {isPending && <TreeSkeleton />}

        {!isPending &&
          treeData &&
          treeData.map((node) => <TreeNode key={node.id} node={node} />)}
      </div>
    </aside>
  )
}
