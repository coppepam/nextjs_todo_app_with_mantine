import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { List } from '@mantine/core'
import { Task } from '@prisma/client'
import { useMutateTask } from '../hooks/useMutateTask'
import useStore from '../store'

export const TaskItem = ({
  id,
  title,
  description,
}: Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()
  return (
    <List.Item>
      <div className="flex items-center gap-2">
        <div className="flex items-center" style={{ width: '2.5rem' }}>
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => update({ id, title, description })}
          />
          <TrashIcon
            className="mx-1 h-5 w-5 cursor-pointer text-red-500"
            onClick={() => deleteTaskMutation.mutate(id)}
          />
        </div>
        <div>{title}</div>
      </div>
    </List.Item>
  )
}
