import type { ActionsDto, SubjectsDto } from '#/constants/enums'
import { useAbilityStore } from '#/stores/useAbilityStore'
import { useCallback } from 'react'

export function useAbility() {
  const { ability } = useAbilityStore()

  const can = useCallback(
    (action: ActionsDto, subject: SubjectsDto) =>
      ability?.can(action, subject) ?? true,
    [ability],
  )
  const cannot = useCallback(
    (action: ActionsDto, subject: SubjectsDto) =>
      ability?.cannot(action, subject) ?? false,
    [ability],
  )

  return { can, cannot, ability }
}
