"use client";
import { useUserAuth } from '@/context/UserAuthContext';
import { AppUserRole } from '@/enums/role';
import { useRouter } from 'next/navigation';

export function withRoles(Component: any, requiredRole: AppUserRole[]) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter()
    const { userRole } = useUserAuth();

    const hasPermission = userRole && requiredRole.includes(userRole);

    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push('/')
      return null
    }
  }
}

export default withRoles;
