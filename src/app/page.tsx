'use client'

import {
  ExclamationCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { IconDatabase } from '@tabler/icons-react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'
import styles from './page.module.css'
import { AuthForm } from './types'

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(5, 'Password should be at least 5 characters'),
})

export default function Home() {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<AuthForm>({
    initialValues: { email: '', password: '' },
    validate: yupResolver(schema),
  })
  const handleSubmit = async () => {
    try {
      setError('')
      console.log(form.values)
      if (isRegister) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          form.values,
        )
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        form.values,
      )

      form.reset()
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.response?.data?.message || error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Auth</title>
        <meta
          name="description"
          content="I have followed setup instructions carefully"
        />
      </Head>
      <main
        className={`${styles.main} flex w-screen flex-1 flex-col justify-center items-center`}
      >
        <ShieldCheckIcon className="w-16 h-16 text-blue-500" />
        {error && (
          <Alert
            title="Authentication Error"
            my="md"
            icon={<ExclamationCircleIcon />}
            color="red"
            variant="filled"
            radius="md"
          >
            {error}
          </Alert>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            id="email"
            label="Email*"
            placeholder="example@gmail.com"
            {...form.getInputProps('email')}
            mt="md"
          />
          <PasswordInput
            id="password"
            label="Password*"
            placeholder="Must be min 5 char"
            {...form.getInputProps('password')}
            mt="md"
          />
          <Group mt="xl" justify="space-between">
            <Anchor
              component="button"
              type="button"
              size="xs"
              className="text-gray-300"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >
              {isRegister
                ? 'Have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              color="cyan"
              leftSection={<IconDatabase size={14} />}
              type="submit"
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Group>
        </form>
      </main>
    </>
  )
}
