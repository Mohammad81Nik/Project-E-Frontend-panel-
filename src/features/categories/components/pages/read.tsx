import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import AddIcon from '@mui/icons-material/Add'
import { useGetAllCategories } from '../../hooks/useCategoryQueries'
import { useCallback, useMemo, useState } from 'react'
import type { TreeViewDefaultItemModelProperties } from '@mui/x-tree-view'
import CreateCategoryModal from '../modals/create'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useModalStore } from '#/stores/useModalStore'
import CategoryDetail from '../ui/category-detail'
import type { ICategory } from '../../types'
import type { Nullable } from '#/types/operators'
import { buildCategoryTree } from '../../utils/buildCategoryTree'
import { findCategory } from '../../utils/findCategory'
import DeleteModal from '#/components/modals/delete-modal'
import Can from '#/components/permission/can'

export default function Read() {
  const { data } = useGetAllCategories()

  const setModal = useModalStore((state) => state.setModal)

  const [selectedCategory, setSelectedCategory] =
    useState<Nullable<ICategory>>(null)

  const treeItems = useMemo<TreeViewDefaultItemModelProperties[]>(() => {
    return buildCategoryTree(data?.data ?? [])
  }, [data?.data])

  const onCreate = useCallback(() => {
    setModal({
      feature: 'categories',
      path: 'create',
      config: {
        open: true,
        props: {
          parentId: null,
        },
      },
    })
  }, [])

  const onItemSelect = useCallback(
    (itemId: string) => {
      const selectedItem = findCategory(itemId, data?.data ?? [])

      setSelectedCategory(selectedItem)
    },
    [data?.data],
  )

  return (
    <>
      <div className="grid grid-cols-[30%_70%] gap-y-4">
        <div className="flex items-center justify-between col-span-2">
          <Typography variant="h5">دسته بندی ها</Typography>

          <Can I="create" a="categories">
            <Button
              onClick={onCreate}
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              ایجاد
            </Button>
          </Can>
        </div>
        <RichTreeView
          items={treeItems}
          sx={{
            borderRight: '1px solid black',
          }}
          onItemClick={(_, itemId) => {
            onItemSelect(itemId)
          }}
        />

        <CategoryDetail
          key={[
            selectedCategory?.id,
            selectedCategory?.title,
            selectedCategory?.description,
          ].join('/')}
          category={selectedCategory}
          setCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <CreateCategoryModal />
      <DeleteModal />
    </>
  )
}
