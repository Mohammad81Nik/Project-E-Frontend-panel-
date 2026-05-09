import { create } from 'zustand'

interface IFeatureModal<T = Record<string, any>> {
  open: boolean
  props?: T
}

interface State {
  global: {
    delete: IFeatureModal<{
      title?: string
      text: string
      onSubmit: () => Promise<any>
    }>
  }
  admins: {
    delete: IFeatureModal<{
      ids: string[]
      adminName?: string
      onFinished?: () => void
    }>
  }
  attributes: {
    delete: IFeatureModal<{
      ids: string[]
      attributeName?: string
      onFinished?: () => void
    }>
  }
  customers: {
    update: IFeatureModal<{ state: number }>
  }
}

interface Actions {
  setModal: <T extends keyof State, U extends keyof State[T]>(args: {
    feature: T
    path: U
    config: State[T][U]
  }) => void
}

const initialState: State = {
  global: {
    delete: {
      open: false,
    },
  },
  admins: {
    delete: {
      open: false,
    },
  },
  attributes: {
    delete: {
      open: false,
    },
  },
  customers: {
    update: { open: false },
  },
}

export const useModalStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setModal: ({ feature, path, config }) =>
    set({
      ...get(),
      [feature]: {
        [path]: { ...get()[feature][path], ...config },
      },
    }),
}))
