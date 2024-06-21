'use client'

import { GetCompaniesResponse } from '@/api/get-companies'
import { getTree } from '@/api/get-tree'
import { FilterSchema } from '@/schemas/filter-schema'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FilterForm } from './filter-form'
import { TreeNode } from './tree-node'
import { TreeSkeleton } from './tree-skeleton'

type Props = {
  company: GetCompaniesResponse[number]
}

export function TreeView({ company }: Props) {
  const [filter, setFilter] = useState<FilterSchema>({
    searchTerm: '',
    scope: 'none',
  })

  const {
    data: treeData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['tree', company.id, filter.searchTerm, filter.scope],
    queryFn: () => getTree({ companyId: company.id, filter }),
    staleTime: Infinity, // we can change this if the data changes often
  })

  return (
    <aside className="min-w-64 resize-x space-y-2 overflow-auto border-2 border-slate-200 p-2">
      <header>
        <FilterForm onSubmit={(data) => setFilter(data)} />
      </header>

      <div className="max-h-[calc(100vh-250px)] w-[33rem] overflow-x-auto">
        {isPending && !isError && <TreeSkeleton />}

        {!isPending &&
          !isError &&
          (treeData.length > 0 ? (
            treeData.map((node) => <TreeNode key={node.id} node={node} />)
          ) : (
            <p className="mt-2 text-center text-sm">
              Nenhum resultado encontrado.
            </p>
          ))}

        {isError && (
          <p className="mt-2 text-center text-sm text-red-500">
            Aconteceu um erro ao carregar as informações. Tente recarregar a
            página!
          </p>
        )}
      </div>
    </aside>
  )
}
