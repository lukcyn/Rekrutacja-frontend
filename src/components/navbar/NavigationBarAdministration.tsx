import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";

const NavigationBarAdministration = () => {
  return (
    <NavigationBarBase>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link">
            Podania
          </a>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" href={"/recruitment/search"}>
              Rekrutacje
          </Link>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdministration;
