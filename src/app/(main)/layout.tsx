import { Header } from './_components/header'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-8 pt-6">{children}</main>
    </div>
  )
}
