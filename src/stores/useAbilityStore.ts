import type { AppAbility } from '#/lib/casl/ability'
import { create } from 'zustand'

interface State {
  ability: AppAbility | null
}

interface Actions {
  setAbility: (ability: AppAbility) => void
  clearAbility: () => void
}

export const useAbilityStore = create<State & Actions>((set, get) => ({
  ability: null,
  setAbility: (ability) => set({ ability }),
  clearAbility: () => set({ ability: null }),
}))
