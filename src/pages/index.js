import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title={"Home"} />
          <div id="home-buttons">
            <Link to="/tq/"><span>Tq</span>Trigrammaton Qabalah</Link>
            <Link to="/hebrew/"><span>Hb</span>Hebrew Qabalah</Link>
            <Link to="/greek/"><span>Gk</span>Greek Qabalah</Link>
          </div>
      </Layout>
    );
  }
}