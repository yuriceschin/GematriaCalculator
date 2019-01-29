import React from "react"
import { Link } from "gatsby"
import "./layout.css"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <div>
  	<header>
      <Link to="/" id="title">
        <h1>TQ Gematria Calculator</h1>
      </Link>
      <ul>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        {/* <ListLink to="/contact/">Contact</ListLink> */}
      </ul>
    </header>

    {children}
    
    <footer>
    	<p>Copyright 2019 © O.T.O. Italia. Tutti i diritti riservati.</p>
    </footer>
  </div>
)