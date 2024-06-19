import { Separator } from '@/components/separator'
import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { ensureCompanyExistsAndGetCompany } from '@/functions/ensure-company-exists'
import { ComponentInfo } from './_components/component-info'
import { TreeView } from './_components/tree-view'

type Props = {
  params: {
    companyName: string
  }
}

export default async function CompanyPage({ params: { companyName } }: Props) {
  const company = await ensureCompanyExistsAndGetCompany(companyName)

  return (
    <main className="flex w-full flex-1 flex-col gap-5">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Ativos</h1>
        <Separator orientation="vertical" className="h-4 rotate-12" />
        <h2 className="text-slate-500">
          {capitalizeFirstLetter(company.name)}
        </h2>
      </div>

      <div className="flex flex-1 gap-2">
        <TreeView company={company} />
        <ComponentInfo />
      </div>
    </main>
  )
}
