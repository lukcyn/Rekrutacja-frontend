"use client";
import { AppUserRole } from "@/enums/role"
import withRole from "@/middleware/withRole"

function AdminHome() {
  return (
    <div>
      This is admin home page
    </div>
  )
}

export default withRole(AdminHome, [AppUserRole.ADMIN]);