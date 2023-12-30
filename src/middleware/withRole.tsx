"use client";
import { useUserRole } from '@/context/UserRoleContext';
import { AppUserRole } from '@/enums/role';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function withRoles(Component: any, requiredRole: AppUserRole[]) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter()
    var { userRole } = useUserRole();

    // check if the role is in cookies
    if(userRole == null) {
      userRole = Cookies.get('role') as AppUserRole | null;
    }

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
