import React from "react";
import NavigationBarBase from "./NavigationBarBase";

const NavigationBarAdmin = () => {
  return (
    <NavigationBarBase>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link">
            Dane użytkowników
          </a>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarAdmin;
