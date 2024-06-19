import { getCompanies } from '@/api/get-companies'
import { notFound } from 'next/navigation'

export async function ensureCompanyExistsAndGetCompany(company: string) {
  const companies = await getCompanies()
  const companyObject = companies.find(
    (companyItem) => companyItem.name.toLowerCase() === company,
  )

  if (!companyObject) {
    notFound()
  }

  return companyObject
}
