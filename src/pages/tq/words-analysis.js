import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export default class A extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title={"Holy Book of Thelema Words Analysis"} />
        <h2>Holy Books Words Analysis</h2>

        <h4>Preamble:</h4>
        <blockquote>
          My scribe Ankh-af-na-khonsu, the priest of the princes, shall not in
          one letter change this book; but lest there be folly, he shall comment
          thereupon by the wisdom of Ra-Hoor-Khu-it. <strong>(AL 1,36)</strong>
        </blockquote>
        <p>
          The same word with or without the capital letter is considered to be
          two different words.
        </p>
        <blockquote>
          Change not as much as the style of a letter; for behold! thou, o
          prophet, shalt not behold all these mysteries hidden therein.{" "}
          <strong>(AL 1,54)</strong>
        </blockquote>
        <p>
          All punctuation marks have been removed. The value of the accented
          letters has been calculated as the letter itself. The value of numbers
          it's the number's value itself. The value of greek and hebrew words
          have been calculated with that relative gematria.
        </p>
        <blockquote>
          Nor shall they who cry aloud their folly that thou meanest nought
          avail; thou shall reveal it: thou availest: they are the slaves of
          because: They are not of me. The stops as thou wilt; the letters?
          change them not in style or value! <strong>(AL 2,54)</strong>
        </blockquote>
        <div id="holy-books">
          <h3>Holy Books:</h3>
          <ul>
                <li><Link to="/tq/words-analysis/words-analysis-liber-al/">
                  Liber AL vel Legis
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-b/">
                  Liber B vel Magi
                </Link></li>
                <li> <Link to="/tq/words-analysis/words-analysis-liber-liberi/">
                  Liber Liberi vel Lapidis Lazuli
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-portalucis/">
                  Liber Porta Lucis
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-trigrammaton/">
                  Liber Trigrammaton
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-cordiscinctiserpente/">
                  Liber Cordis Cincti Serpente
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-stellaerubae/">
                  Liber Stellæ Rubeæ
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-tzaddi/">
                  Liber Tzaddi vel Hamus Hermeticus
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-cheth/">
                  Liber Cheth vel Vallum Abiegni
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-aash/">
                  Liber A’ash vel Capricorni Pneumatici
                </Link></li>
                <li><Link to="/tq/words-analysis/words-analysis-liber-ararita/">
                  Liber ARARITA
                </Link></li>
            </ul>
        </div>
      </Layout>
    );
  }
}
