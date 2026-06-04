import { create } from 'zustand'

interface State {
  stage: number
}

interface Actions {
  setStage: (state: State['stage']) => void
  reset: () => void
}

const initialState: State = {
  stage: 0,
}

export const useCreateStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setStage: (stage) => set({ stage }),
  reset: () => set(initialState),
}))
