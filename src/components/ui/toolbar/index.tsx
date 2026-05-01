import cn from '#/utils/cn'

interface IToolbarProps {
  children: React.ReactNode
}
function Toolbar({ children }: IToolbarProps) {
  return <div className="grid grid-cols-2 gap-y-2">{children}</div>
}

function ToolbarActions({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn(className)}>{children}</div>
}

Toolbar.actions = ToolbarActions

export default Toolbar
