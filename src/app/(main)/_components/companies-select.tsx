'use client'

import { capitalizeFirstLetter } from '@/functions/capitalize-first-letter'
import { useClickOutside } from '@/hooks/use-click-outside'
import { useComponentStore } from '@/store/use-component-store'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type Company = {
  id: string
  name: string
}

type Props = {
  companies: Company[]
}

export function CompaniesSelect({ companies }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => {
    setIsOpen(false)
  })
  const companiesNames = companies.map((company) => company.name.toLowerCase())

  const router = useRouter()
  const pathname = usePathname()
  const selectedCompany =
    pathname.split('/').length > 1 &&
    companiesNames.includes(pathname.split('/')[1]) &&
    capitalizeFirstLetter(pathname.split('/')[1])

  const handleSelect = (company: Company) => {
    router.push(`/${company.name.toLowerCase()}`)
    setIsOpen(false)

    useComponentStore.setState((state) => ({
      ...state,
      selectedComponent: undefined,
    }))
  }

  return (
    <div ref={ref} className="relative">
      <button
        className="flex h-10 w-44 items-center justify-between rounded-md border-2 border-gray-800 bg-slate-900 px-3 py-2 text-xs font-semibold transition-colors hover:bg-gray-800"
        onClick={() => setIsOpen((state) => !state)}
      >
        {selectedCompany || 'Select a company...'}
        <ChevronDownIcon className="size-4 opacity-50" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border border-gray-800 bg-slate-900 shadow-lg"
          >
            {companies.map((company) => (
              <li
                key={company.id}
                className="cursor-pointer p-2 text-xs transition-colors duration-300 hover:bg-gray-800"
                onClick={() => handleSelect(company)}
              >
                {company.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
