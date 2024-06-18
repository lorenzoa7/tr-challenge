import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type Props = {
  orientation: 'horizontal' | 'vertical'
} & ComponentProps<'div'>

export function Separator({ orientation, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  )
}
