import { getCompanies } from '@/api/get-companies'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const companies = await getCompanies()

  if (companies.length === 0) {
    throw Error('No company found.')
  }

  redirect(companies[0].name.toLowerCase())
}
