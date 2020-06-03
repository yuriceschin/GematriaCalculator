import React from "react";
import { graphql } from "gatsby";
import autosize from "autosize";
import {isMobile} from 'react-device-detect';
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export default class GreekCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: 0,
      correspondences: [],
      data: [],
      searchedWord: []
    };
    this.timeout = 0;
    this.textarea = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    if(!isMobile) {this.textarea.focus();}
    autosize(this.textarea);
    this.hydrateStateWithLocalStorage();
    this.setState({ input: "", result: 0, correspondences:[], data: this.props.data.allGreekcorrespondencesCsv.edges });
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    this.setState({ input: "", result: 0, data: [], correspondences:[],searchedWord:[] });
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
    localStorage.setItem(
      "searchedWord",
      JSON.stringify(this.state.searchedWord)
    );
  }

  handleChange(event) {
    this.setState({
      result: 0,
      correspondences: [],
      input: event.target.value
    });

    var x = 0;
    var filteredData = [];

    for (var i = 0; i < event.target.value.length; i++) {
      x =
        x +
        this.calculateGreekGematriaValue(
          event.target.value
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

        this.setState(prevState => ({ correspondences: filteredData }));
      }
    );

    // Save a word after it has been searched
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (
        this.state.input !== "" &&
        isNaN(this.state.input) &&
        this.state.searchedWord.indexOf(
          this.state.input + "|" + this.state.result
        ) === -1
      ) {
        if (this.state.searchedWord.length === 10) {
          this.state.searchedWord.pop();
        }
        this.state.searchedWord.unshift(
          this.state.input.substring(0, 20) +
            (this.state.input.length >= 20 ? "..." : "") +
            "|" +
            this.state.result
        );
      }
      localStorage.setItem(
        "searchedWord",
        JSON.stringify(this.state.searchedWord)
      );
      this.setState(prevState => ({ searchedWord: this.state.searchedWord }));
    }, 2500);
  }

  clickHandler(letter) {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(this.textarea, this.textarea.value + letter);
    var ev2 = new Event("change", { bubbles: true });
    this.textarea.dispatchEvent(ev2);
    this.setState(
      prevState => ({ input: this.textarea.value }),
      function() {
        if(!isMobile) {this.textarea.focus();}
      }
    );
  }

  clearHandler() {
    this.setState(
      prevState => ({ input: "", result: 0, correspondences:[] }),
      function() {
        if(!isMobile) {this.textarea.focus();}
      }
    );
  }

  clearPastSearches() {
    this.setState(
      prevState => ({ searchedWord: [] }),
      function() {
        localStorage.setItem(
          "searchedWord",
          JSON.stringify(this.state.searchedWord)
        );
      }
    );
  }

  render() {
    const letters = [
      "Α α ",
      "Β β ",
      "Γ γ ",
      "Δ δ ",
      "Ε ε ",
      "Ϝ ϛ ",
      "Ζ ζ ",
      "Η η ",
      "Θ θ ",
      "Ι ι ",
      "Κ κ ",
      "Λ λ ",
      "Μ μ ",
      "Ν ν ",
      "Ξ ξ ",
      "Ο ο ",
      "Π π ",
      "Ϙ ϙ ",
      "Ρ ρ ",
      "Σ σ ς",
      "Τ τ ",
      "Υ υ ",
      "Φ φ ",
      "Χ χ ",
      "Ψ ψ ",
      "Ω ω ",
      " ϡ "
    ];

    return (
      <Layout>
        <SEO title={"Greek"} />
        <div id="calculator">
          <textarea
            name="word"
            value={this.state.input}
            placeholder="Type here..."
            aria-label="Type here..."
            ref={input => (this.textarea = input)}
            rows={1}
            onChange={e => {
              this.handleChange(e);
            }}
          />

          <p className="result">{this.state.result}</p>
        </div>
        <div className="letterButtons">
          <h4>Click on the letter to type:</h4>
          <div id="virtual-keyboard">
            {letters.map(letter => {
              var maiusc = letter.split(" ")[0];
              var minusc = letter.split(" ")[1];
              var minuscAlt = letter.split(" ")[2];
              return (
                <button
                  key={letter}
                  className="comment-btn"
                  onClick={() => this.clickHandler(minusc)}
                >
                  {maiusc}
                  {minusc}
                  {minuscAlt}{" "}
                </button>
              );
            })}
          </div>
          <button className="clear" onClick={() => this.clearHandler()}>
            clear
          </button>
        </div>
        {this.state.searchedWord.length > 1 && (
          <div className="pastSearches">
            <h4>Past searches (<button onClick={() => this.clearPastSearches()}>clear</button>):</h4>
            <ul>
              {" "}
              {this.state.searchedWord.map(word => {
                var w = word.split("|")[1];
                var n = word.split("|")[0];
                return (
                  <li key={word}>
                    {n}
                    <span>{w}</span>
                  </li>
                );
              })}{" "}
            </ul>
          </div>
        )}
        {this.state.correspondences.length !== 0 && (
          <div className="correspondences">
            <h4>Other greek words with the same value:</h4>

            <table>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Word</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {this.state.correspondences.map((row, i) => (
                  <tr key={`${i}`}>
                    <td>{row.node.value}</td>
                    <td>{row.node.word}</td>
                    <td>{row.node.meaning}</td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
          </div>
        )}{" "}
      </Layout>
    );
  }

  // TQ Gematria Values

  calculateGreekGematriaValue(letter) {
    switch (letter) {
      case "α":
        return 1;
      case "β":
        return 2;
      case "γ":
        return 3;
      case "δ":
        return 4;
      case "ε":
        return 5;
      case "ϛ":
        return 6;
      case "ζ":
        return 7;
      case "η":
        return 8;
      case "θ":
        return 9;
      case "ι":
        return 10;
      case "κ":
        return 20;
      case "λ":
        return 30;
      case "μ":
        return 40;
      case "ν":
        return 50;
      case "ξ":
        return 60;
      case "ο":
        return 70;
      case "π":
        return 80;
      case "ϙ":
        return 90;
      case "ρ":
        return 100;
      case "σ":
        return 200;
      case "ς":
        return 200;
      case "τ":
        return 300;
      case "υ":
        return 400;
      case "φ":
        return 500;
      case "χ":
        return 600;
      case "ψ":
        return 700;
      case "ω":
        return 800;
      case "ϡ":
        return 900;
      default:
        return null;
    }
  }
}

export const IndexQuery = graphql`
  query {
    allGreekcorrespondencesCsv {
      edges {
        node {
          value
          word
          meaning
        }
      }
    }
  }
`;
