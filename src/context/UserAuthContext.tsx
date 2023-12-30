"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { AppUserRole } from '@/enums/role';

type UserAuthContextProps = {
  userRole: AppUserRole | null;
  setUserRole: (role: AppUserRole | null) => void;
  jwt: string | null;
  setJWT: (token: string | null) => void;
};

const UserAuthContext = createContext<UserAuthContextProps | undefined>(undefined);

export const UserAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = React.useState<AppUserRole | null>(null);
  const [jwt, setJWT] = React.useState<string | null>(null);

  return (
    <UserAuthContext.Provider value={{ userRole, setUserRole, jwt, setJWT }}>
      { children }
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
