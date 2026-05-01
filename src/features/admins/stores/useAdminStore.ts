import { create } from 'zustand'

interface State {}

interface Actions {}

export const useAdminStore = create<State & Actions>((set, get) => ({}))
