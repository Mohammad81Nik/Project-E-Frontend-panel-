import { Outlet } from '@tanstack/react-router'

export default function UnAuthenticatedLayout() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-400 px-4">
      <div className="w-full lg:w-2/3 p-2 rounded-md border border-blue-500 bg-white flex flex-col items-center gap-y-4">
        <Outlet />
      </div>
    </div>
  )
}
