import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";
import { changeActivityStatus } from "@/api/activityStatus";
import { ActivityStatus } from "@/types/ActivityStatus";

const NavigationBarAdministration = () => {

  const onActivityChange = (activityStatus: ActivityStatus) => {    
    changeActivityStatus(activityStatus)
      .catch(error => {});
  };

  const afterLogout = () => {
    changeActivityStatus(ActivityStatus.INACTIVE)
    .catch(error => {});
  }

  return (
    <NavigationBarBase hasActivityIndicator onActivityChange={onActivityChange} afterLogout={afterLogout}>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" href={"/applications"}>
            Podania
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" href={"/recruitment"}>
              Rekrutacje
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" href={"/chat/administration"}>
              Chat
          </Link>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdministration;
