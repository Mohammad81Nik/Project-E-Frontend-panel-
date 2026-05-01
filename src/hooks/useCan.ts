import type { ActionsDto, SubjectsDto } from '#/constants/enums'
import { useAbilityStore } from '#/stores/useAbilityStore'
import isNonEmpty from '#/utils/isNonEmpty'

export function useCan(action: ActionsDto, subject: SubjectsDto) {
  const ability = useAbilityStore((state) => state.ability)

  return isNonEmpty(ability) ? ability.can(action, subject) : false
}
