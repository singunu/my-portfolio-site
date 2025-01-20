import Providers from '@/components/providers/ThemeProvider'
// import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "singunu's portfolio",
  description: '신건우의 포트폴리오 웹사이트입니다',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="relative min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}