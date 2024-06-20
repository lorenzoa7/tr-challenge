import { AssetNode, Node } from '@/functions/build-tree'
import { create } from 'zustand'

type ComponentState = {
  selectedComponent?: AssetNode & { children: Node[]; type: 'component' }
}

export const useComponentStore = create<ComponentState>(() => ({
  selectedComponent: undefined,
}))
