import React, { useEffect, useState } from "react";
import Link from "next/link";
import logout from "@/utils/logout";
import { useUserRole } from "@/context/UserRoleContext";
import "./Navigation.css";
import { ActivityStatus } from "@/types/ActivityStatus";
import { useIdleTimer } from "react-idle-timer";

type Props = {
  children: React.ReactNode;
  onLogout?: () => void;
  hasLogoutButton?: boolean;
  hasActivityIndicator?: boolean;
  onActivityChange?: (activityStatus: ActivityStatus) => void;
};

const NavigationBarBase = ({
  children,
  hasLogoutButton = true,
  hasActivityIndicator = false,
  onActivityChange = (activityStatus: ActivityStatus) => {},
}: Props) => {
  const idleTimeoutMs = 3000;
  const { setUserRole } = useUserRole();
  const [state, setState] = useState<string>(ActivityStatus.ACTIVE);
  const [remaining, setRemaining] = useState<number>(0);

  const onIdle = () => {
    if(state == ActivityStatus.ACTIVE)
      onActivityChange(ActivityStatus.INACTIVE);
    
    setState(ActivityStatus.INACTIVE);
  };

  const onActive = () => {
    if(state == ActivityStatus.INACTIVE)
      onActivityChange(ActivityStatus.ACTIVE);
    
    setState(ActivityStatus.ACTIVE);
  };

  const onAction = () => {
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: idleTimeoutMs,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

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
          <div className="ml-auto d-flex align-items-center">
            {hasActivityIndicator && (
              <span
                className="dot mx-2"
                style={{
                  backgroundColor:
                    state == ActivityStatus.ACTIVE ? "green" : "orange",
                }}
              ></span>
            )}
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
