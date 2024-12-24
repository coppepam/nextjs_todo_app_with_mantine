import { User } from "@prisma/client"
import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        console.error(error)
      }
    }
  })
})

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    try {
      const { data } = await axios.get<Omit<User, "hashedPassword">>(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      return data
    } catch (error: any) {
      if ([401, 403].includes(error.response?.status)) {
        router.push('/')
      }
      throw error
    }
  }

  return useQuery<Omit<User, "hashedPassword">>({
    queryKey: ['user'],
    queryFn: getUser,
    meta: {errorMessage: 'test'},
  })
}