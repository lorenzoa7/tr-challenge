import { LogoIcon } from '@/components/icons/logo'
import { Separator } from '@/components/separator'
import { Skeleton } from '@/components/skeleton'
import { Suspense } from 'react'
import { CompaniesWrapper } from './companies-wrapper'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 bg-slate-900 px-6 text-slate-100">
        <LogoIcon className="size-28 fill-slate-100" />

        <Separator orientation="vertical" className="h-6 w-[2px] rotate-12" />

        <Suspense fallback={<Skeleton className="h-10 w-44 bg-slate-800" />}>
          <CompaniesWrapper />
        </Suspense>
      </div>
    </div>
  )
}
