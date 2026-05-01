import keyGenerators from '#/constants/keyGenerators'
import type { FileRouteTypes } from '#/routeTree.gen'
import type { TSubmitFn } from '#/types/form'
import isNonEmpty from '#/utils/isNonEmpty'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Form, Formik } from 'formik'
import { useCallback, useMemo } from 'react'
import { omit, omitMany } from '#/utils/omitKey'

interface IFilterCnf {
  label: string
  key: string
  type: 'text' | 'array'
}

interface ISearchbarProps<T extends FileRouteTypes['id']> {
  filters: IFilterCnf[]
  from: T
}

export default function Searchbar<T extends FileRouteTypes['id']>({
  filters,
  from,
}: ISearchbarProps<T>) {
  const search = useSearch({ from })

  const completeFilters = useMemo(() => {
    const comp = [...filters]
    comp.push({ key: 'all', label: 'همه', type: 'text' })

    return comp
  }, [filters])

  const navigate = useNavigate()

  const onSubmit = useCallback<
    TSubmitFn<{ search: string; type: 'all' | string }>
  >(
    (values, { setFieldValue }) => {
      navigate({
        to: '.',
        search: {
          ...(values.type !== 'all'
            ? {
                // @ts-expect-error: works but not typed
                ...omit(search, 'all'),
                [values.type]: values.search,
              }
            : {
                ...omitMany(
                  search,
                  // @ts-expect-error: works but not typed
                  filters.map((filter) => filter.key),
                ),
                all: values.search,
              }),
        },
        replace: true,
      })

      setFieldValue('search', '')
    },
    [search],
  )

  const activeFilters = useMemo(
    () =>
      completeFilters.reduce((acc, curr) => {
        const currentSearch = search as Record<string, any>

        if (isNonEmpty(currentSearch[curr.key])) {
          acc.push(curr)
        }

        return acc
      }, [] as IFilterCnf[]),
    [search],
  )

  return (
    <Formik
      initialValues={{
        search: '',
        type: 'all',
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <>
          <Form className="flex items-center gap-x-2 pt-2">
            <TextField
              label="جستجو"
              value={values.search}
              onChange={(e) => setFieldValue('search', e.target.value)}
            />

            <FormControl>
              <InputLabel id="search-type-select">نوع فیلتر</InputLabel>
              <Select
                sx={{
                  minWidth: '160px',
                }}
                label="نوع فیلتر"
                value={values.type}
                onChange={(e) => {
                  setFieldValue('type', e.target.value)
                }}
                labelId="search-type-select"
              >
                <MenuItem value="all">همه</MenuItem>
                {filters.map((filter, idx) => (
                  <MenuItem
                    key={keyGenerators.searchbarMenuItems(idx)}
                    value={filter.key}
                  >
                    {filter.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton
              type="submit"
              color="primary"
              disabled={!isNonEmpty(values.search)}
            >
              <FilterAltIcon />
            </IconButton>
          </Form>

          <div className="col-span-2 flex items-center gap-x-2 order-2">
            {activeFilters.map((filter, idx) => (
              <Chip
                key={keyGenerators.searchbarChip(idx)}
                label={filter.label}
                onDelete={() => {
                  navigate({
                    to: '.',
                    search: {
                      // @ts-expect-error: works but not typed
                      ...omit(search, filter.key),
                    },
                    replace: true,
                  })
                }}
              />
            ))}
          </div>
        </>
      )}
    </Formik>
  )
}
