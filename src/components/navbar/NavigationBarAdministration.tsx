import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";

const NavigationBarAdministration = () => {
  return (
    <NavigationBarBase>
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
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdministration;
