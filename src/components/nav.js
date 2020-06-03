import React from "react";
import { Link } from "gatsby";

const ListLink = props => (
  <li>
    <Link to={props.to} activeClassName="active">
      {props.children}
    </Link>
  </li>
);

export default class Navigation extends React.Component {
  render() {
    return (
      <ul>
        <ListLink to="/">Home</ListLink>
        <li>
          <Link
          to="/tq/"
          activeClassName="active"
          partiallyActive={true}
          >
            Trigrammaton <span className="menu-icon" />
          </Link>
          <ul className="dropdown">
            <ListLink to="/tq/about/">About</ListLink>
            <ListLink to="/tq/words-analysis/">Books Analysis</ListLink>
          </ul>
        </li>
        <li>
          <Link
          to="/hebrew/"
          activeClassName="active"
          partiallyActive={true}
          >
            Hebrew <span className="menu-icon" />
          </Link>
          <ul className="dropdown">
            <ListLink to="/hebrew/about/">About</ListLink>
          </ul>
        </li>
        <li>
          <Link
          to="/greek/"
          activeClassName="active"
          partiallyActive={true}
          >
            Greek <span className="menu-icon" />
          </Link>
          <ul className="dropdown">
            <ListLink to="/greek/about/">About</ListLink>
          </ul>
        </li>
      </ul>
    );
  }
}
