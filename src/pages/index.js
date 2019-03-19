import React from "react";
import { graphql } from "gatsby";
import autosize from "autosize";
import Layout from "../components/layout";

export default class TQCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: 0, data: [], searchedWord: [] };
    this.timeout = 0;
    this.textarea = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);

    this.hydrateStateWithLocalStorage();
    this.setState({ result: 0 });
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    this.setState({ result: 0 });
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  handleChange(event) {
    this.setState({ result: 0 });
    this.setState({ data: this.props.data.allCorrespondencesCsv.edges });

    var x = 0;
    var filteredData = [];

    for (var i = 0; i < this.textarea.value.length; i++) {
      x =
        x +
        this.calculateTQValue(
          this.textarea.value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .charAt(i)
        );
    }
    this.setState(
      prevState => ({
        result:
          isNaN(this.textarea.value) || this.textarea.value === ""
            ? prevState.result + x
            : this.textarea.value
      }),
      function() {
        filteredData = this.state.data.filter((row, i) => {
          return row.node.value === String(this.state.result);
        });

        this.setState(prevState => ({ data: filteredData }));
        //this.searchList = JSON.parse(localStorage.getItem("searched"));
      }
    );

    //Save a word after it has been searched
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (
        this.textarea.value !== "" &&
        isNaN(this.textarea.value) &&
        this.state.searchedWord.indexOf(
          this.textarea.value + "|" + this.state.result
        ) === -1
      ) {
        if (this.state.searchedWord.length === 10) {
          this.state.searchedWord.pop();
        }
        this.state.searchedWord.unshift(
          this.textarea.value.substring(0, 20) +
            (this.textarea.value.length >= 20 ? "..." : "") +
            "|" +
            this.state.result
        );
      }
      localStorage.setItem(
        "searchedWord",
        JSON.stringify(this.state.searchedWord)
      );
      this.setState(prevState => ({ searchedWord: this.state.searchedWord }));
    }, 1500);
  }

  render() {
    return (
      <Layout>
        <div id="calculator">
          <textarea
            name="word"
            placeholder="Type here..."
            defaultValue=""
            ref={c => (this.textarea = c)}
            rows={1}
            onChange={this.handleChange}
          />

          <p className="result">{this.state.result}</p>
        </div>

        {this.state.searchedWord.length > 1 && (
          <div className="pastSearches">
            <h4>Past searches:</h4>
            <ul>
              {this.state.searchedWord.map(word => {
                var w = word.split("|")[0];
                var n = word.split("|")[1];
                return (
                  <li key={word}>
                    {w}
                    <span>{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {this.state.data.length !== 0 && (
          <div>
            <h4>
              Other words from <i>Liber AL vel Legis</i> with the same value:
            </h4>

            <table>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>TQ Value</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((row, i) => (
                  <tr key={`${i}`}>
                    <td>{row.node.word}</td>
                    <td>{row.node.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    );
  }

  // TQ Gematria Values

  calculateTQValue(letter) {
    switch (letter) {
      case "a":
        return 5;
      case "b":
        return 20;
      case "c":
        return 2;
      case "d":
        return 23;
      case "e":
        return 13;
      case "f":
        return 12;
      case "g":
        return 11;
      case "h":
        return 3;
      case "i":
        return 0;
      case "j":
        return 7;
      case "k":
        return 17;
      case "l":
        return 1;
      case "m":
        return 21;
      case "n":
        return 24;
      case "o":
        return 10;
      case "p":
        return 4;
      case "q":
        return 16;
      case "r":
        return 14;
      case "s":
        return 15;
      case "t":
        return 9;
      case "u":
        return 25;
      case "v":
        return 22;
      case "w":
        return 8;
      case "x":
        return 6;
      case "y":
        return 18;
      case "z":
        return 19;
      case "&":
        return 26;
      default:
        return null;
    }
  }
}

export const IndexQuery = graphql`
  query {
    allCorrespondencesCsv {
      edges {
        node {
          word
          value
        }
      }
    }
  }
`;
