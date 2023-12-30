import React from "react";
import Link from "next/link";
import logout from "@/utils/logout";
import { useUserRole } from "@/context/UserRoleContext";

type Props = {
  children: React.ReactNode;
  onLogout?: () => void;
  hasLogoutButton?: boolean;
};

const NavigationBarBase = ({ children, hasLogoutButton = true }: Props) => {
  const { setUserRole } = useUserRole();

  return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
          <Link className="navbar-brand" href="/">
            Rekrutacja
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {children}
          </div>

          {hasLogoutButton && (
            <div className="ml-auto">
              <button
                className="btn btn-light"
                onClick={() => logout(setUserRole)}
              >
                Wyloguj
              </button>
            </div>
          )}
        </nav>
      </div>
  );
};

export default NavigationBarBase;
