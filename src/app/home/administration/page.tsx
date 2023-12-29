"use client";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";

const AdministrationHome = () => {
  return (
    <div>
      This is administration home page
    </div>
  )
}

export default withRole(AdministrationHome, [AppUserRole.ADMINISTRATION_EMPLOYEE]);