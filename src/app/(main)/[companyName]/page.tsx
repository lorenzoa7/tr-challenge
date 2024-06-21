import { Separator } from '@/components/separator'
import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { ensureCompanyExistsAndGetCompany } from '@/functions/ensure-company-exists'
import { filterSchema } from '@/schemas/filter-schema'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ComponentInfo } from './_components/component-info'
import { FilterForm } from './_components/filter-form'
import { TreeSkeleton } from './_components/tree-skeleton'
import { TreeView } from './_components/tree-view'

type Props = {
  params: {
    companyName: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CompanyPage({
  params: { companyName },
  searchParams,
}: Props) {
  const company = await ensureCompanyExistsAndGetCompany(companyName)

  const searchTerm = 'search' in searchParams ? searchParams.search : ''
  const scope = 'scope' in searchParams ? searchParams.scope : 'none'

  const filterResult = filterSchema.safeParse({ searchTerm, scope })

  if (!filterResult.success) {
    notFound()
  }

  const { data: filter } = filterResult

  return (
    <main className="flex w-full flex-1 flex-col gap-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Ativos</h1>
        <Separator orientation="vertical" className="h-4 rotate-12" />
        <h2 className="text-slate-500">
          {capitalizeFirstLetter(company.name)}
        </h2>
      </div>

      <div className="flex flex-1 gap-2">
        <aside className="min-w-64 resize-x space-y-2 overflow-auto border-2 border-slate-200 p-2">
          <FilterForm />

          <div className="max-h-[calc(100vh-250px)] w-[33rem] overflow-x-auto">
            <Suspense fallback={<TreeSkeleton />}>
              <TreeView companyId={company.id} filter={filter} />
            </Suspense>
          </div>
        </aside>

        <ComponentInfo />
      </div>
    </main>
  )
}
