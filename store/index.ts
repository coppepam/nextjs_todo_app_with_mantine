import { EditedTask } from '@/app/types'
import { create } from 'zustand'

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
  editedTask: {id: 0, title: '', description: ''},
  updateEditedTask: (payload: EditedTask) => set({editedTask: payload}),
  resetEditedTask: () => set({editedTask: {id: 0, title: '', description: ''}})
}))

export default useStore