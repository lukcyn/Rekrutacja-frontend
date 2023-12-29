"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { AppUserRole } from '@/enums/role';

type UserRoleContextProps = {
  userRole: AppUserRole | null;
  setUserRole: (role: AppUserRole | null) => void;
};

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = React.useState<AppUserRole | null>(null);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      { children }
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
