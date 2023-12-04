import type { Metadata } from 'next'


import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

import { Ubuntu } from 'next/font/google';
import { Toaster } from 'sonner';
const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
  weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: 'Motion School',
  description: 'Generated by Aman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={ubuntu.className}>
        <main>{children}</main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
    </ClerkProvider>
  )
}
