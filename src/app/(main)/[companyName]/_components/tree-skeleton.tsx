'use client'

import { Skeleton } from '@/components/skeleton'

export function TreeSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="mb-2 h-6 w-full" />
      ))}
    </>
  )
}
