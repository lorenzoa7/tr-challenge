import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { ensureCompanyExists } from '@/functions/ensure-company-exists'

type Props = {
  params: {
    company: string
  }
}

export default async function CompanyPage({ params: { company } }: Props) {
  await ensureCompanyExists(company)

  return <div>{capitalizeFirstLetter(company)}</div>
}
