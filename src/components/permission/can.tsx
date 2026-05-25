import type { ActionsDto, SubjectsDto } from '#/constants/enums'
import { useAbility } from '#/hooks/useAbility'
import { useMemo } from 'react'

interface ICanProps {
  I: ActionsDto
  a: SubjectsDto
  children?: React.ReactNode
}
export default function Can({ I, a, children }: ICanProps) {
  const { can } = useAbility()

  const hasPermission = useMemo(() => can(I, a), [I, a, can])

  if (!hasPermission) return null

  return <>{children}</>
}
