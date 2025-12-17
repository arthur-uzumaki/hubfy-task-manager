import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: '%s | hubfy.ai',
    default: 'hubfy.ai',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={`${roboto.className}`}
      lang="pt-br"
      suppressHydrationWarning
    >
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
