"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import { AppUserRole } from '@/enums/role'
import NavigationBarCandidate from '@/components/navbar/NavigationBarCandidate'
import { useState } from 'react'
import NavigationBarAdmin from '@/components/navbar/NavigationBarAdmin'
import NavigationBarAdministration from '@/components/navbar/NavigationBarAdministration'
import NavigationBarAnonymous from '@/components/navbar/NavigationBarAnonymous';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentRole, setCurrentRole] = useState<AppUserRole>();

  const renderNavbarBasedOnRole = () => {
    switch (currentRole) {
      case AppUserRole.CANDIDATE:
        return (<NavigationBarCandidate />);
      case AppUserRole.ADMIN:
        return (<NavigationBarAdmin />);
      case AppUserRole.ADMINISTRATION_EMPLOYEE:
        return (<NavigationBarAdministration />);
      default:
        return (<NavigationBarAnonymous />);
    }
  }
    

  return (
    <html lang="en">
      <body className={inter.className}>
        {renderNavbarBasedOnRole()}
        {children}
      </body>
    </html>
  )
}
