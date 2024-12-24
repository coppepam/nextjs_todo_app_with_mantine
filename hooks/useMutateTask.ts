import { EditedTask } from "@/app/types"
import { Task } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import useStore from "../store"

export const useMutateTask = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation({
    mutationFn: async (task: Omit<EditedTask, 'id'>) => {
      const { data } = await axios.post<Task>(`${process.env.NEXT_PUBLIC_API_URL}/todo`, task)
      return data
    },
    onSuccess: (res) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], [res, ...previousTasks])
      }
      reset();
    },
    onError: (error: any) => {
      reset();
      if ([401, 403].includes(error.response?.status)) {
        router.push('/')
      }
    }
  })

  const updateTaskMutation = useMutation({
    mutationFn: async (task: EditedTask) => {
      const { data } = await axios.patch<Task>(`${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`, task)
      return data
    },
    onSuccess: (res) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], previousTasks.map((task) => task.id === res.id ? res : task))
      }
      reset()
    },
    onError: (error: any) => {
      reset()
      if ([401, 403].includes(error.response?.status)) {
        router.push('/')
      }
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`)
    },
    onSuccess: (_, variables) => {
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], previousTasks.filter((task) => task.id !== variables))
      }
      reset();
    },
    onError: (error: any) => {
      reset();
      if ([401, 403].includes(error.response?.status)) {
        router.push('/')
      }
    }
  })

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}