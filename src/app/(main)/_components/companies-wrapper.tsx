import { getCompanies } from '@/api/get-companies'
import { CompaniesSelect } from './companies-select'

export async function CompaniesWrapper() {
  const companies = await getCompanies()

  return <CompaniesSelect companies={companies} />
}
