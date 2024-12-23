import { Provider as QueryClientProvider } from '@/app/providers/QueryClientProvider'
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider>
          <MantineProvider
            defaultColorScheme="auto"
            theme={{
              fontFamily: 'Verdana, sans-serif',
            }}
          >
            <div className="flex min-h-screen flex-col justify-center items-center">
              {children}
            </div>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
