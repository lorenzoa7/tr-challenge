import { Node } from '@/functions/build-tree'
import { create } from 'zustand'

type ComponentState = {
  selectedComponent?: Node
}

export const useComponentStore = create<ComponentState>(() => ({
  selectedComponent: undefined,
}))
