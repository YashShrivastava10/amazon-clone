import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./main.css"
import Header from '@/components/main/Header'
import Footer from '@/components/main/Footer'
import ReduxProvider from '../ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amazon-Clone',
  description: 'Generated by create next app',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-screen w-screen'>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
