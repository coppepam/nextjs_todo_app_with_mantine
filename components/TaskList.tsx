import { List, Loader, ThemeIcon } from '@mantine/core'
import { Task } from '@prisma/client'
import { IconCircleDashed } from '@tabler/icons-react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItem } from './TaskItem'

type TaskListProps = {
  tasks: Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>[]
}

export const TaskList = () => {
  const { data: tasks, status } = useQueryTasks()

  if (status === 'pending') {
    return <Loader my="lg" color="cyan" />
  }
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {tasks?.map((task) => <TaskItem key={task.id} {...task} />)}
    </List>
  )
}
