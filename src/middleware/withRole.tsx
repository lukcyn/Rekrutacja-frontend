"use client";
import { useUserRole } from '@/context/UserRoleContext';
import { AppUserRole } from '@/enums/role';
import { useRouter } from 'next/navigation';

export function withRoles(Component: any, requiredRole: AppUserRole[]) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter()
    const { userRole } = useUserRole();

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
