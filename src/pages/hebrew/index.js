import React from "react";
import { graphql } from "gatsby";
import autosize from "autosize";
import {isMobile} from 'react-device-detect';
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export default class HebrewCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "", result: 0, data: [], correspondences: [], searchedWord: [] };
    this.timeout = 0;
    this.textarea = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    if(!isMobile) {this.textarea.focus();}
    autosize(this.textarea);

    this.hydrateStateWithLocalStorage();
    this.setState({ input: "", result: 0, correspondences:[], data: this.props.data.allLiber500Csv.edges });
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    this.setState({ input: "", result: 0, data:[],correspondences:[],searchedWord: [] });
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
        this.calculateLiber500Value(
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

    //Save a word after it has been searched
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
    }, 1500);
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
      prevState => ({ input: "", result: 0,correspondences:[] }),
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
      "א",
      "ב",
      "ג",
      "ד",
      "ה",
      "ו",
      "ז",
      "ח",
      "ט",
      "י",
      "כ",
      "ל",
      "מ",
      "נ",
      "ס",
      "ע",
      "פ",
      "צ",
      "ק",
      "ר",
      "ש",
      "ת"
    ];

    return (
      <Layout>
        <SEO title={"Hebrew"} />
        <div id="calculator">
          <label>
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
          </label>

          <p className="result">{this.state.result}</p>
        </div>

        <div className="letterButtons">
          <h4>Click on the letter to type:</h4>
          <div id="virtual-keyboard">
          {letters.map(letter => (
            <button
              key={letter}
              className="comment-btn"
              onClick={() => this.clickHandler(letter)}
            >
              {letter}
            </button>
          ))}
          </div>
          <button className="clear" onClick={() => this.clearHandler()}>
            clear
          </button>
        </div>

        {this.state.searchedWord.length > 1 && (
          <div className="pastSearches">
             <h4>Past searches (<button onClick={() => this.clearPastSearches()}>clear</button>):</h4>
            <ul>
              {this.state.searchedWord.map(word => {
                var w = word.split("|")[1];
                var n = word.split("|")[0];
                return (
                  <li key={word}>
                    {n}
                    <span>{w}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {this.state.correspondences.length !== 0 && (
          <div className="correspondences">
            <h4>
              Other words from <i>Liber 500</i> with the same value:
            </h4>

            <table>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Word</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {this.state.correspondences.map((row, i) => (
                  <tr key={`${i}`}>
                    <td>{row.node.value}</td>
                    <td>{row.node.word}</td>
                    <td>{row.node.meaning}</td>
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

  calculateLiber500Value(letter) {
    switch (letter) {
      case "א":
        return 1;
      case "ב":
        return 2;
      case "ג":
        return 3;
      case "ד":
        return 4;
      case "ה":
        return 5;
      case "ו":
        return 6;
      case "ז":
        return 7;
      case "ח":
        return 8;
      case "ט":
        return 9;
      case "י":
        return 10;
      case "כ":
        return 20;
      case "ל":
        return 30;
      case "מ":
        return 40;
      case "נ":
        return 50;
      case "ס":
        return 60;
      case "ע":
        return 70;
      case "פ":
        return 80;
      case "צ":
        return 90;
      case "ק":
        return 100;
      case "ר":
        return 200;
      case "ש":
        return 300;
      case "ת":
        return 400;
      default:
        return null;
    }
  }

  convertToHebrew(letter) {
    switch (letter) {
      case "a":
        return "א";
      default:
        return null;
    }
  }
}

export const IndexQuery = graphql`
  query {
    allLiber500Csv {
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
