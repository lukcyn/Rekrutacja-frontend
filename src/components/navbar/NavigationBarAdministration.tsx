import React from "react";
import NavigationBarBase from "./NavigationBarBase";

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
          <a className="nav-link">
            Rekrutacje
          </a>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdministration;
