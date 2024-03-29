import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./auth.css"
import Footer from '@/components/auth/Footer'
import ReduxProvider from '../ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amazon-Clone',
  description: 'Generated by create next app',
}

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='
      bg-white text-black
      min-w-screen min-h-screen 
      flex flex-col items-center gap-6
      relative'>
        <ReduxProvider>
          <div className='flex-1 w-[360px] pt-2'>
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
