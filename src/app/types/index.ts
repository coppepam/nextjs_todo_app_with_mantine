export type AuthForm = {
  username: string
  password: string
}

export type EditedTask = {
  id: number
  title: string
  description?: string | null
}