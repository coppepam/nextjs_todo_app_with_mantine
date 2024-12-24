'use client'
import { IconLogout } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { TaskForm } from '../../../components/TaskForm'
import { TaskList } from '../../../components/TaskList'
import { UserInfo } from '../../../components/UserInfo'

const DashBoardPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const handleLogout = async () => {
    queryClient.removeQueries({ queryKey: ['tasks'] })
    queryClient.removeQueries({ queryKey: ['user'] })
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }

  return (
    <>
      <IconLogout
        className="w-6 h-6 cursor-pointer text-blue-500"
        onClick={handleLogout}
      />
      <UserInfo />
      <TaskForm />
      <TaskList />
    </>
  )
}

export default DashBoardPage
