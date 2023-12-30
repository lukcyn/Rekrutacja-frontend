import { AppUserRole } from '@/enums/role';
import Cookies from 'js-cookie';

const logout = (setUserRole: (role: AppUserRole | null) => void) => {
    setUserRole(null);
    Cookies.remove('token');
    Cookies.remove('role');
};

export default logout;
