import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type Props = {
  orientation: 'horizontal' | 'vertical'
} & ComponentProps<'div'>

export function Separator({ orientation, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'bg-slate-200',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  )
}
