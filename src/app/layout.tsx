"use client";
import {Inter} from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import {UserRoleProvider} from '@/context/UserRoleContext';
import NavigationBarRoleAdaptive from '@/components/navbar/NaviagtionBarRoleAdaptive';
import {SubmitApplicationResultProvider} from '@/context/submitApplicationResultContext';
import {UserDataProvider} from "@/context/userDataContext";
import {MaturaSubjectsProvider} from "@/context/maturaSubjectsContext";
import {PreferenceTestResultProvider} from "@/context/preferenceTestResultContext";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode
}

export default function RootLayout({children}: Props) {

    return (
        <html lang="pl">
        <body className={inter.className}>
        <UserRoleProvider>
            <UserDataProvider>
                <MaturaSubjectsProvider>
                    <PreferenceTestResultProvider>
                        <SubmitApplicationResultProvider>
                            <NavigationBarRoleAdaptive/>
                            {children}
                        </SubmitApplicationResultProvider>
                    </PreferenceTestResultProvider>
                </MaturaSubjectsProvider>
            </UserDataProvider>
        </UserRoleProvider>
        </body>
        </html>
    )
}
