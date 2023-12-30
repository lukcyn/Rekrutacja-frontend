"use client";
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { UserRoleProvider } from '@/context/UserRoleContext';
import NavigationBarRoleAdaptive from '@/components/navbar/NaviagtionBarRoleAdaptive';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {

  return (
    <html lang="pl">
        <body className={inter.className}>
      <UserRoleProvider>
          <NavigationBarRoleAdaptive/>
          {children}
      </UserRoleProvider>
        </body>
    </html>
  )
}
