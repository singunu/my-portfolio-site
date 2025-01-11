import Providers from '@/components/providers/ThemeProvider'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "singunu's portfolio",
  description: '신건우의 포트폴리오 웹사이트입니다',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen min-w-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}