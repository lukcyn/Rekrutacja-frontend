import React from "react";
import NavigationBarBase from "./NavigationBarBase";
import Link from "next/link";

const NavigationBarCandidate = () => {
  return (
    <NavigationBarBase>
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
          <Link className="nav-link" href={"/submitting-applications"}>
            Złóż podanie
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={"/preferences"}>
            Sprawdź swoje preferencje
          </Link>
        </li>
      </ul>
    </NavigationBarBase>
  );
};

export default NavigationBarCandidate;
