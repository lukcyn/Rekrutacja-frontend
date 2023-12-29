import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppUserRole } from '@/enums/role';
import { useUserRole } from '@/context/UserRoleContext';

const withRole = (allowedRoles: AppUserRole[]) => (WrappedComponent: React.FC) => {
  const WrapperComponent: React.FC = (props) => {
    const router = useRouter();
    const { userRole } = useUserRole();

    // TODO: resolve typescript error
    useEffect(() => {
      if (!allowedRoles.includes(userRole)) {
        router.push('/');
      }
    }, [userRole]);

    if (!allowedRoles.includes(userRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default withRole;
