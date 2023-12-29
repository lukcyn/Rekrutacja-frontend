import React from "react";
import NavigationBarCandidate from "./NavigationBarCandidate";
import NavigationBarAdmin from "./NavigationBarAdmin";
import NavigationBarAdministration from "./NavigationBarAdministration";
import NavigationBarAnonymous from "./NavigationBarAnonymous";
import { AppUserRole } from "@/enums/role";
import { useUserRole } from "@/context/UserRoleContext";

const NavigationBarRoleAdaptive = () => {
  const { userRole, setUserRole } = useUserRole();

  const onLogout = () => {
    setUserRole(null);
  }

  const renderNavbarBasedOnRole = () => {
    switch (userRole) {
      case AppUserRole.CANDIDATE:
        return <NavigationBarCandidate onLogout={ onLogout }/>;
      case AppUserRole.ADMIN:
        return <NavigationBarAdmin onLogout={ onLogout }/>;
      case AppUserRole.ADMINISTRATION_EMPLOYEE:
        return <NavigationBarAdministration onLogout={ onLogout }/>;
      default:
        return <NavigationBarAnonymous/>;
    }
  };

  return renderNavbarBasedOnRole();
};

export default NavigationBarRoleAdaptive;
