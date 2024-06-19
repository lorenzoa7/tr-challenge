import { Separator } from '@/components/separator'
import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { ensureCompanyExists } from '@/functions/ensure-company-exists'

type Props = {
  params: {
    company: string
  }
}

export default async function CompanyPage({ params: { company } }: Props) {
  await ensureCompanyExists(company)

  return (
    <main className="flex w-full flex-1 flex-col gap-5">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Ativos</h1>
        <Separator orientation="vertical" className="h-4 rotate-12" />
        <h2 className="text-slate-500">{capitalizeFirstLetter(company)}</h2>
      </div>

      <div className="flex flex-1 gap-2">
        <aside>Tree view</aside>
        <section className="flex-1">Asset info</section>
      </div>
    </main>
  )
}
