import type { ActionsDto, SubjectsDto } from '#/constants/enums'
import type { AppAbility } from './ability'

export function assertPermission(
  ability: AppAbility,
  action: ActionsDto,
  subject: SubjectsDto,
) {
  if (!ability.can(action, subject)) {
    throw new Error('Forbidden')
  }
}
