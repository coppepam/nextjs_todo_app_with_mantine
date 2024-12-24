import { Task } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"

// const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: (error, query) => {
//       if (query.meta?.errorMessage) {
//         console.error(error)
//       }
//     }
//   })
// })

export const useQueryTasks = () => {
  const router = useRouter()
  const getTasks = async () => {
    try {
      const { data } = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
      return data
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/')
      }
      throw error
    }
  }

  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    meta: {errorMessage: 'test'},
  })
}