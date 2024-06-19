'use client'

import { useComponentStore } from '@/store/use-component-store'

export function ComponentInfo() {
  const { selectedComponent } = useComponentStore()
  return (
    <section className="flex-1 border-2 border-slate-200 p-2">
      {selectedComponent
        ? selectedComponent.name
        : 'Select a component to check its information.'}
    </section>
  )
}
