"use client";
import { AppUserRole } from "@/enums/role";
import withRoles from "@/middleware/withRole";

const CandidateHome = () => {
  return (
    <div>
      This is candidate home page
    </div>
  )
}

export default withRoles(CandidateHome, [AppUserRole.CANDIDATE]);
