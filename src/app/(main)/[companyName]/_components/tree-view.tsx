'use client'

import { getAssets } from '@/api/get-assets'
import { GetCompaniesResponse } from '@/api/get-companies'
import { getLocations } from '@/api/get-locations'
import { buildTree } from '@/functions/build-tree'
import { filterTreeData } from '@/functions/filter-tree-data'
import { FilterSchema } from '@/schemas/filter-schema'
import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import { FilterForm } from './filter-form'
import { TreeNode } from './tree-node'
import { TreeSkeleton } from './tree-skeleton'

type Props = {
  company: GetCompaniesResponse[number]
}

export function TreeView({ company }: Props) {
  const [filteredTreeData, setFilteredTreeData] =
    useState<ReturnType<typeof buildTree>>()

  const { data, isPending, status, count } = useQueries({
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
      const data = {
        locations: results[0].data,
        assets: results[1].data,
      }

      if (data.locations && data.assets) {
        const treeData = buildTree({
          locations: data.locations,
          assets: data.assets,
        })

        return {
          data: filterTreeData({
            treeData,
            filter: { scope: 'none', searchTerm: '' },
          }),
          isPending: results.some((result) => result.isPending),
          count: data.locations.length + data.assets.length,
          status: 'success',
        }
      }

      return {
        data: undefined,
        isPending: results.some((result) => result.isPending),
        count: 0,
        status: 'error',
      }
    },
  })

  function handleFilter(filter: FilterSchema) {
    if (filter.scope === 'none' && filter.searchTerm === '') {
      setFilteredTreeData(undefined)
      return
    }

    if (data) {
      setFilteredTreeData(filterTreeData({ treeData: data, filter }))
    }
  }

  const treeData = filteredTreeData || data

  return (
    <aside className="min-w-64 resize-x space-y-2 overflow-auto border-2 border-slate-200 p-2">
      <header className="flex flex-col gap-1">
        <FilterForm onSubmit={handleFilter} />
        {status === 'success' && treeData && (
          <span className="pl-1 text-sm text-slate-500">{`${count} resultados`}</span>
        )}
      </header>

      <div className="max-h-[calc(100vh-275px)] w-[33rem] overflow-x-auto">
        {isPending ? (
          <TreeSkeleton />
        ) : status === 'error' ? (
          <p className="mt-2 text-center text-sm text-red-500">
            Aconteceu um erro ao carregar as informações. Tente recarregar a
            página!
          </p>
        ) : status === 'success' && treeData && treeData.length > 0 ? (
          treeData.map((node) => <TreeNode key={node.id} node={node} />)
        ) : (
          <p className="mt-2 text-center text-sm">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </aside>
  )
}
