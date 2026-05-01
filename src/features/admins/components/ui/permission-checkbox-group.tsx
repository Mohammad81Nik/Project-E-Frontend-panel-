import type { ActionsDto, PermissionsDto, SubjectsDto } from '#/constants/enums'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useCallback, useMemo } from 'react'

interface IPermissionCheckboxGroupProps {
  title: string
  subject: SubjectsDto
  permissions: PermissionsDto[]
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any
}

export default function PermissionCheckboxGroup({
  subject,
  permissions,
  setFieldValue,
  title,
}: IPermissionCheckboxGroupProps) {
  const existingSubjectPermissions = useMemo(
    () => permissions.filter((perm) => perm.includes(subject)),
    [permissions],
  )

  const { isCreateChecked, isUpdateChecked, isDeleteChecked, isReadChecked } =
    useMemo(
      () => ({
        isCreateChecked: permissions.includes(`${subject}:create`),
        isUpdateChecked: permissions.includes(`${subject}:update`),
        isDeleteChecked: permissions.includes(`${subject}:delete`),
        isReadChecked: permissions.includes(`${subject}:read`),
      }),
      [subject, permissions],
    )

  const handleCheckRead = useCallback(() => {
    if (isReadChecked) {
      setFieldValue(
        'permissions',
        permissions.filter(
          (perm) =>
            ![
              `${subject}:create`,
              `${subject}:read`,
              `${subject}:update`,
              `${subject}:delete`,
            ].includes(perm),
        ),
      )
    } else {
      setFieldValue('permissions', [
        ...permissions,
        `${subject}:read`,
        ...(existingSubjectPermissions.length === 0
          ? ['create', 'update', 'delete'].map(
              (action) => `${subject}:${action}`,
            )
          : []),
      ])
    }
  }, [isReadChecked, subject, permissions, existingSubjectPermissions])

  const handleCheckChild = useCallback(
    (checked: boolean, action: ActionsDto) => () => {
      if (checked) {
        setFieldValue(
          'permissions',
          permissions.filter((perm) => {
            if (existingSubjectPermissions.length === 2) {
              return (
                perm !== `${subject}:${action}` && perm !== `${subject}:read`
              )
            }

            return perm !== `${subject}:${action}`
          }),
        )
      } else {
        setFieldValue('permissions', [
          ...permissions,
          `${subject}:${action}`,
          ...(existingSubjectPermissions.length === 0
            ? [`${subject}:read`]
            : []),
        ])
      }
    },
    [subject, permissions, existingSubjectPermissions],
  )

  return (
    <div>
      <FormControlLabel
        label={`${title} (مشاهده)`}
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '18px',
            fontWeight: 700,
          },
        }}
        control={
          <Checkbox
            checked={isReadChecked}
            // indeterminate={checked[0] !== checked[1]}
            onChange={handleCheckRead}
          />
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: '24px',
        }}
      >
        <FormControlLabel
          label="ایجاد"
          control={
            <Checkbox
              checked={isCreateChecked}
              onChange={handleCheckChild(isCreateChecked, 'create')}
            />
          }
        />
        <FormControlLabel
          label="ویرایش"
          control={
            <Checkbox
              checked={isUpdateChecked}
              onChange={handleCheckChild(isUpdateChecked, 'update')}
            />
          }
        />
        <FormControlLabel
          label="حذف"
          control={
            <Checkbox
              checked={isDeleteChecked}
              onChange={handleCheckChild(isDeleteChecked, 'delete')}
            />
          }
        />
      </Box>
    </div>
  )
}
