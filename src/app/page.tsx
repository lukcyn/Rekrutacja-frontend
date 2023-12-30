"use client";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import { useLayoutEffect } from "react";
import { AppUserRole } from "@/enums/role";

export default function IndexPage() {
  const router = useRouter();
  const { userRole } = useUserAuth();

  useLayoutEffect(() => {
    switch (userRole) {
      case AppUserRole.CANDIDATE:
        router.push("/home/candidate");
        break;
      case AppUserRole.ADMIN:
        router.push("/home/admin");
        break;
      case AppUserRole.ADMINISTRATION_EMPLOYEE:
        router.push("/home/administration");
        break;
      default:
        router.push("/login");
        break;
    }
  }, [userRole]);

  return <div></div>;
}
