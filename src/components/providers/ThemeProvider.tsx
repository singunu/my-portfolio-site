'use client'

import { ThemeProvider as NextThemeProvider } from '@/context/ThemeContext'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return <NextThemeProvider>{children}</NextThemeProvider>
}