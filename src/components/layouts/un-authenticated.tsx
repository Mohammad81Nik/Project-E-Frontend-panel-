import { Outlet } from '@tanstack/react-router'

export default function UnAuthenticatedLayout() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-[420px] px-4 rounded-md flex flex-col items-start gap-y-4">
        <Outlet />
      </div>
    </div>
  )
}
