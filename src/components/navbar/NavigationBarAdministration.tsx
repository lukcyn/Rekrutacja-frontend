import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";
import {changeActivityStatus} from "@/api/activityStatus";
import {ActivityStatus} from "@/types/ActivityStatus";

const NavigationBarAdministration = () => {

  
  const onActivityChange = (activityStatus: ActivityStatus) => {    
    changeActivityStatus(activityStatus)
      .catch(error => {});
  };

  const afterLogout = () => {
    changeActivityStatus(ActivityStatus.INACTIVE)
    .catch(error => {});
  }

  const onActivityPing = (activityStatus: ActivityStatus) => {
    if(activityStatus === ActivityStatus.INACTIVE)
      return;

    changeActivityStatus(ActivityStatus.ACTIVE)
      .catch(error => {});
  }

  return (
    <NavigationBarBase hasActivityIndicator onActivityChange={onActivityChange} afterLogout={afterLogout} onActivityPing={onActivityPing}>
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
        <li className="nav-item active">
                    <Link className="nav-link" href={"/usersData"}>
                        Zarządzanie danymi użytkowników
                    </Link>
                </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdministration;
