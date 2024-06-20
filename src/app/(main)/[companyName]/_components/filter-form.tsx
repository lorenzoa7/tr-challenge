import { objectEntries } from '@/functions/object-entries'
import { useClickOutside } from '@/hooks/use-click-outside'
import {
  FilterSchema,
  filterSchema,
  filterScope,
} from '@/schemas/filter-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon, ChevronDownIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: (data: FilterSchema) => void
}

export function FilterForm({ onSubmit }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => {
    setIsOpen(false)
  })

  const { register, handleSubmit, setValue, watch } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: '',
      scope: 'none',
    },
  })

  const scopeWatch = watch('scope')

  function handleSelect(scope: FilterSchema['scope']) {
    setValue('scope', scope)
    setIsOpen(false)
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Buscar ativo ou local... "
        className="h-10 w-56 rounded-lg border border-slate-300 bg-slate-100 px-2 text-sm text-slate-800 ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        {...register('searchTerm')}
      />

      <div ref={ref} className="relative">
        <button
          type="button"
          className="flex h-10 w-40 items-center justify-between rounded-md border-2 border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold transition-colors hover:bg-slate-200"
          onClick={() => setIsOpen((state) => !state)}
        >
          {scopeWatch === 'none' ? 'Filtro...' : filterScope[scopeWatch]}
          <ChevronDownIcon className="size-4 opacity-50" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-2 w-full rounded border border-slate-200 bg-slate-100 text-sm shadow-lg"
            >
              {objectEntries(filterScope).map(([key, value]) => (
                <li
                  key={key}
                  data-selected={scopeWatch === key}
                  className="flex cursor-pointer items-center gap-1 p-2 transition-colors hover:bg-slate-200 data-[selected=true]:bg-slate-200 data-[selected=false]:pl-6"
                  onClick={() => handleSelect(key)}
                >
                  {scopeWatch === key && <CheckIcon className="size-3" />}
                  {value}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-slate-50 transition-colors hover:bg-blue-500/70"
      >
        <SearchIcon className="mr-2 size-4" />
        Pesquisar
      </button>
    </form>
  )
}
