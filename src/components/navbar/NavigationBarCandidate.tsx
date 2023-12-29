import React from "react";
import NavigationBarBase from "./NavigationBarBase";

const NavigationBarCandidate = ({onLogout = () => {}}) => {
  return (
    <NavigationBarBase onLogout={ onLogout }>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link">
            Czat
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            Profil
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            Podanie
          </a>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarCandidate;
