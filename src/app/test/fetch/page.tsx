"use client";
import { testApiCall, testApiCallSecured } from "@/api/testFetch"
import { AppUserRole } from "@/enums/role";
import withRoles from "@/middleware/withRole";
import { useEffect } from "react"


function TestFetch() {
  
  useEffect(() => {
    testApiCall();
    testApiCallSecured();
  }, [])
  
  return (
    <div>
      <div>
        <div>This is a test page at url/test</div>
      </div>
    </div>
  )
}

export default withRoles(TestFetch, [AppUserRole.CANDIDATE, AppUserRole.ADMINISTRATION_EMPLOYEE, AppUserRole.ADMIN]);
