import React from "react";
import { Link } from "gatsby";
import Navigation from "./nav";
import OffCanvas from "./offcanvas";
import "./layout.css";

export default ({ children }) => (
  <div>
    <header>
      <Link to="/" id="title">
        <h1>TQ Gematria Calculator</h1>
      </Link>
      <nav role="navigation" id="menu">
        <Navigation />
      </nav>
      <OffCanvas />
    </header>

    {children}

    <footer>
      <p>Copyright <span>{(new Date().getFullYear())}</span> © O.T.O. Italy. All rights reserved.</p>
    </footer>
  </div>
);
