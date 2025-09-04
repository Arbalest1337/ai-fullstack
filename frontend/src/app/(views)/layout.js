import Menu from '@/components/Menu/Menu'

export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      <div className="shrink-0 grow-0 p-2">
        <Menu />
      </div>
      <div className="grow shrink overflow-y-auto">{children}</div>
    </div>
  )
}
