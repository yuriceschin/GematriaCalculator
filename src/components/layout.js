import React from "react";
import { Link } from "gatsby";
import "./layout.css";

const ListLink = props => (
  <li>
    <Link to={props.to} activeClassName="active">
      {props.children}
    </Link>
  </li>
);

export default ({ children }) => (
  <div>
    <header>
      <Link to="/" id="title">
        <h1>TQ Gematria Calculator</h1>
      </Link>
      <nav role="navigation">
        <ul>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
          <li>
            <Link
              to="/words-analysis/"
              activeClassName="active"
              partiallyActive={true}
            >
              Holy Books Words Analysis <span class="sort-direction desc" />
            </Link>
            <ul className="dropdown">
              <ListLink to="/words-analysis/words-analysis-liber-al/">
                Liber AL vel Legis
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-b/">
                Liber B vel Magi
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-liberi/">
                Liber Liberi vel Lapidis Lazuli
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-portalucis/">
                Liber Porta Lucis
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-trigrammaton/">
                Liber Trigrammaton
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-cordiscinctiserpente/">
                Liber Cordis Cincti Serpente
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-stellaerubae/">
                Liber Stellæ Rubeæ
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-tzaddi/">
                Liber Tzaddi vel Hamus Hermeticus
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-cheth/">
                Liber Cheth vel Vallum Abiegni
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-aash/">
                Liber A’ash vel Capricorni Pneumatici
              </ListLink>
              <ListLink to="/words-analysis/words-analysis-liber-ararita/">
                Liber ARARITA
              </ListLink>
            </ul>
          </li>
        </ul>
      </nav>
    </header>

    {children}

    <footer>
      <p>Copyright 2020 © O.T.O. Italy. All rights reserved.</p>
    </footer>
  </div>
);
