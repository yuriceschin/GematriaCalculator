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
      <nav role="navigation">
        <ul>
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about/" activeClassName="active">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/words-analysis/"
              activeClassName="active"
              partiallyActive={true}
            >
              Holy Books Words Analysis
            </Link>
            <ul className="dropdown">
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-al/"
                  activeClassName="active"
                >
                  Liber AL vel Legis
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-b/"
                  activeClassName="active"
                >
                  Liber B vel Magi
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-liberi/"
                  activeClassName="active"
                >
                  Liber Liberi vel Lapidis Lazuli
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-portalucis/"
                  activeClassName="active"
                >
                  Liber Porta Lucis
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-trigrammaton/"
                  activeClassName="active"
                >
                  Liber Trigrammaton
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-cordiscinctiserpente/"
                  activeClassName="active"
                >
                  Liber Cordis Cincti Serpente
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-stellaerubae/"
                  activeClassName="active"
                >
                  Liber Stellæ Rubeæ
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-tzaddi/"
                  activeClassName="active"
                >
                  Liber Tzaddi vel Hamus Hermeticus
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-cheth/"
                  activeClassName="active"
                >
                  Liber Cheth vel Vallum Abiegni
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-aash/"
                  activeClassName="active"
                >
                  Liber A’ash vel Capricorni Pneumatici
                </Link>
              </li>
              <li>
                <Link
                  to="/words-analysis/words-analysis-liber-ararita/"
                  activeClassName="active"
                >
                  Liber ARARITA
                </Link>
              </li>
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
