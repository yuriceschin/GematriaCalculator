import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.allRecurrencesCsv.edges,
      sort: {
        column: "count",
        direction: "desc"
      }
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort = column => {
    return e => {
      const direction = this.state.sort.column
        ? this.state.sort.direction === "asc"
          ? "desc"
          : "asc"
        : "desc";
      const sortedColumns = this.state.data.sort((a, b) => {
        switch (column) {
          case "word": {
            const nameA = a.node.word.toUpperCase(); // ignore upper and lowercase
            const nameB = b.node.word.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          case "value": {
            const nameA = a.node.value * 1; // ignore upper and lowercase
            const nameB = b.node.value * 1; // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          case "count": {
            const nameA = a.node.count * 1; // ignore upper and lowercase
            const nameB = b.node.count * 1; // ignore upper and lowercase

            if (nameA < nameB) return -1;
            if (nameA < nameB) return 1;
            else return 0;
          }
          default:
            return a - b;
        }
      });

      if (direction === "desc") {
        sortedColumns.reverse();
      }

      this.setState({
        users: sortedColumns,
        sort: {
          column,
          direction
        }
      });
    };
  };

  setArrow = column => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    return className;
  };

  render() {
    return (
      <Layout>
        <h2>Liber AL - Words value and recurrences</h2>

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
        {/* <blockquote>
          This book shall be translated into all tongues: but always with the
          original in the writing of the Beast; for in the chance shape of the
          letters and their position to one another: in these are mysteries that
          no Beast shall divine. Let him not seek to try: but one cometh after
          him, whence I say not, who shall discover the Key of it all. Then this
          line drawn is a key: then this circle squared in its failure is a key
          also. And Abrahadabra. It shall be his child & that strangely. Let him
          not seek after this; for thereby alone can he fall from it.{" "}
          <strong>(AL 3,47)</strong>
        </blockquote> */}
        <p>
          There is a total of <strong>6009</strong> words in Liber AL and{" "}
          <strong>1344</strong> different words (including numbers and &).
          <br />
          Here you can find each word, its value based upon the TQ Gematria and
          the number of times it appears in Liber AL.
        </p>
        <div className="table">
          <div className="header">
            <div onClick={this.onSort("word")}>
              Word
              <span className={`${this.setArrow("word")}`} />
            </div>
            <div onClick={this.onSort("value")}>
              Value
              <span className={this.setArrow("value")} />
            </div>
            <div onClick={this.onSort("count")}>
              Count
              <span className={this.setArrow("count")} />
            </div>
          </div>
          <div className="body">
            {this.state.data.map((row, i) => (
              <div className="row" key={`${row.node.word} ${i}`}>
                <div>{row.node.word}</div>
                <div>{row.node.value}</div>
                <div>{row.node.count}</div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export const IndexQuery = graphql`
  query {
    allRecurrencesCsv {
      edges {
        node {
          word
          value
          count
        }
      }
    }
  }
`;
