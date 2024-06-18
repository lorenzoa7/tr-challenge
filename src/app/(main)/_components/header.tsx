import { LogoIcon } from '@/components/icons/logo'
import { Separator } from '@/components/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 bg-foreground px-6 text-background">
        <LogoIcon className="size-28 fill-background" />

        <Separator orientation="vertical" className="h-6 w-[2px] rotate-12" />

        <nav className="flex items-center space-x-4  lg:space-x-6">
          Companies
        </nav>
      </div>
    </div>
  )
}
