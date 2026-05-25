import type { ActionsDto, SubjectsDto } from '#/constants/enums'
import { useAbility } from '#/hooks/useAbility'
import { useMemo } from 'react'

interface ICannotProps {
  I: ActionsDto
  a: SubjectsDto
  children?: React.ReactNode
}
export default function Can({ I, a, children }: ICannotProps) {
  const { cannot } = useAbility()

  const hasPermission = useMemo(() => !cannot(I, a), [I, a, cannot])

  if (hasPermission) return null

  return <>{children}</>
}
