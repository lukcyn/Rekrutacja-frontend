import React from "react";
import NavigationBarCandidate from "./NavigationBarCandidate";
import NavigationBarAdmin from "./NavigationBarAdmin";
import NavigationBarAdministration from "./NavigationBarAdministration";
import NavigationBarAnonymous from "./NavigationBarAnonymous";
import { AppUserRole } from "@/enums/role";
import { useUserRole } from "@/context/UserRoleContext";


const NavigationBarRoleAdaptive = () => {
  const { userRole, setUserRole } = useUserRole();

  const renderNavbarBasedOnRole = () => {
    switch (userRole) {
      case AppUserRole.CANDIDATE:
        return <NavigationBarCandidate/>;
      case AppUserRole.ADMIN:
        return <NavigationBarAdmin/>;
      case AppUserRole.ADMINISTRATION_EMPLOYEE:
        return <NavigationBarAdministration/>;
      default:
        return <NavigationBarAnonymous/>;
    }
  };

  return renderNavbarBasedOnRole();
};

export default NavigationBarRoleAdaptive;
