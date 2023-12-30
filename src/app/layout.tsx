"use client";
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { UserAuthProvider } from '@/context/UserAuthContext';
import NavigationBarRoleAdaptive from '@/components/navbar/NaviagtionBarRoleAdaptive';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {

  return (
    <html lang="pl">
      <UserAuthProvider>
        <body className={inter.className}>
          <NavigationBarRoleAdaptive/>
          {children}
        </body>
      </UserAuthProvider>
    </html>
  )
}
