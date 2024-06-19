import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type Company = {
  id: string
  name: string
}

type CustomSelectProps = {
  companies: Company[]
}

export function Select({ companies }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const handleSelect = (company: Company) => {
    setSelectedCompany(company)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div
        className="cursor-pointer rounded bg-gray-200 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCompany ? selectedCompany.name : 'Select a Company'}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full rounded border border-gray-300 bg-white shadow-lg"
          >
            {companies.map((company) => (
              <li
                key={company.id}
                className="cursor-pointer p-2 hover:bg-gray-100"
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
