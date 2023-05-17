import { create } from 'zustand'

interface IState {
    placeholder: boolean;
}

export const useStore = create<IState>((set) => ({
  placeholder: true,
}))

