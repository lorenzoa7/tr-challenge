import { getCompanies } from '@/api/get-companies'
import { notFound } from 'next/navigation'

export async function ensureCompanyExists(company: string) {
  const companies = await getCompanies()
  const companiesNames = companies.map((company) => company.name.toLowerCase())

  if (!companiesNames.includes(company)) {
    notFound()
  }
}
