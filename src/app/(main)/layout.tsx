import { Header } from './_components/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 pt-3">{children}</main>
    </div>
  )
}
