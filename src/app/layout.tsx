import type { Metadata, Viewport } from 'next'
import Providers from '@/components/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: "singunu's portfolio",
  description: '신건우의 포트폴리오 웹사이트입니다',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
