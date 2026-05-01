import type { ActionsDto, PermissionsDto, SubjectsDto } from '#/constants/enums'
import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from '@casl/ability'

export type AppAbility = MongoAbility<[ActionsDto, SubjectsDto]>

export function createAbility(permissions: PermissionsDto[]) {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  for (const permission of permissions) {
    const [subject, action] = permission.split(':') as [SubjectsDto, ActionsDto]

    if (subject === 'all' && action === 'manage') {
      can('manage', 'all')
      continue
    }

    can(action, subject)
  }

  return build()
}
