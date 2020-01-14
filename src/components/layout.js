import React from "react";
import { Link } from "gatsby";
import "./layout.css";

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

export default ({ children }) => (
  <div>
    <header>
      <Link to="/" id="title">
        <h1>TQ Gematria Calculator</h1>
      </Link>
      <ul>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/words-analysis/">Words Analysis</ListLink>
      </ul>
    </header>

    {children}

    <footer>
      <p>Copyright 2020 © O.T.O. Italy. All rights reserved.</p>
    </footer>
  </div>
);
