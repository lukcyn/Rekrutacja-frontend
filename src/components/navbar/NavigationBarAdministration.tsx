import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";
import {changeActivityStatus} from "@/api/activityStatus";
import {ActivityStatus} from "@/types/ActivityStatus";

const NavigationBarAdministration = () => {

    const onActivityChange = (activityStatus: ActivityStatus) => {
        console.log(activityStatus);

        changeActivityStatus(activityStatus)
            .catch(error => {
            });
    };

    return (
        <NavigationBarBase hasActivityIndicator onActivityChange={onActivityChange}>
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
                    <Link className="nav-link" href={"/usersData"}>
                        Zarządzanie danymi użytkowników
                    </Link>
                </li>
            </ul>
        </NavigationBarBase>
    );
};

export default NavigationBarAdministration;
