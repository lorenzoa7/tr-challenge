import { Node } from '@/functions/build-tree'
import { useComponentStore } from '@/store/use-component-store'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BoxIcon,
  BoxesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MapPinIcon,
} from 'lucide-react'
import { useState } from 'react'

type Props = {
  node: Node
}

export function TreeNode({ node }: Props) {
  const { selectedComponent } = useComponentStore()
  const isSelected = selectedComponent?.id === node.id
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = node.children.length > 0
  const isRoot =
    (node.type !== 'location' && !node.locationId && !node.parentId) ||
    !node.parentId

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
      return
    }

    if (node.type === 'component') {
      useComponentStore.setState((state) => ({
        ...state,
        selectedComponent: node,
      }))
    }
  }

  return (
    <div
      data-is-root={isRoot}
      data-has-border={hasChildren && isExpanded}
      className="border-l pl-2 data-[has-border=false]:border-transparent data-[has-border=true]:border-gray-300"
    >
      <div
        data-selected={isSelected}
        data-can-be-selected={!isSelected && node.type === 'component'}
        className="group mb-2 flex cursor-pointer items-center rounded-md px-3 transition-colors duration-300 data-[selected=true]:bg-blue-200 data-[can-be-selected=true]:hover:bg-blue-200/50"
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="mr-2">
            {isExpanded ? (
              <ChevronDownIcon className="size-5" />
            ) : (
              <ChevronRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-[2px]" />
            )}
          </span>
        )}

        {node.type === 'location' && (
          <MapPinIcon className="mr-2 size-5 text-blue-500" />
        )}
        {node.type === 'asset' && (
          <BoxesIcon className="mr-2 size-5 text-blue-500" />
        )}
        {node.type === 'component' && (
          <BoxIcon className="mr-2 size-5 text-blue-500" />
        )}

        <span
          data-selected={isSelected}
          className="transition-opacity data-[selected=false]:group-hover:opacity-75"
        >
          {node.name}
        </span>

        {node.type === 'component' && (
          <span
            data-alert={node.status === 'alert'}
            className="ml-2 data-[alert=false]:text-green-500 data-[alert=true]:text-red-500"
          >
            {node.sensorType === 'energy' ? '⚡' : '●'}
          </span>
        )}
      </div>
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4"
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
