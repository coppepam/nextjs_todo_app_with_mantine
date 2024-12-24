import { Button, Center, TextInput } from '@mantine/core'
import { IconDatabase } from '@tabler/icons-react'
import { useMutateTask } from '../hooks/useMutateTask'
import useStore from '../store'

export const TaskForm = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => state.updateEditedTask)
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) {
      const { title, description } = editedTask
      createTaskMutation.mutate({ title, description })
    } else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        mt="md"
        placeholder="title"
        value={editedTask.title || ''}
        onChange={(e) =>
          update({ ...editedTask, title: e.currentTarget.value })
        }
      />
      <TextInput
        mt="md"
        placeholder="description"
        value={editedTask.description || ''}
        onChange={(e) =>
          update({ ...editedTask, description: e.currentTarget.value })
        }
      />
      <Center mt="md">
        <Button
          disabled={editedTask.title === ''}
          leftSection={<IconDatabase size={14} />}
          type="submit"
          color="cyan"
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </Button>
      </Center>
    </form>
  )
}
