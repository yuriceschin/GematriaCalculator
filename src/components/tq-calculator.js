import React from 'react';
import autosize from "autosize";
import TQCorrispondences from "../components/tq-corrispondences"

export default class TQValueCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({result:0});
    this.textarea = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.textarea.focus();
    autosize(this.textarea);
  }

  handleChange(event) {

    this.setState({result: 0})
    var x = 0

    for (var i = 0; i < this.textarea.value.length; i++) {
      x = x + this.calculateTQValue(this.textarea.value.toLowerCase().charAt(i))
    }

    this.setState(prevState=>({result: prevState.result + x}))

  }

  render(){

    return(
      <div id="calculator">
          
          <textarea
            name="word"
            placeholder='Type here...'
            defaultValue = ''
            ref={c => (this.textarea = c)}
            rows={1}
            onChange={this.handleChange}
            >
          </textarea>
      
         <p className="result">
            {this.state.result}
         </p>
         
         <TQCorrispondences tqResult={this.state.result}/>
      
      </div>
      
    )
  }


  // TQ Gematria Values

  calculateTQValue(letter) {
      switch(letter) {
        case 'a': return 5;
        case 'b': return 20;
        case 'c': return 2;
        case 'd': return 23;
        case 'e': return 13;
        case 'f': return 12;
        case 'g': return 11;
        case 'h': return 3;
        case 'i': return 0;
        case 'j': return 7;
        case 'k': return 17;
        case 'l': return 1;
        case 'm': return 21;
        case 'n': return 24;
        case 'o': return 10;
        case 'p': return 4;
        case 'q': return 16;
        case 'r': return 14;
        case 's': return 15;
        case 't': return 9;
        case 'u': return 25;
        case 'v': return 22;
        case 'w': return 8;
        case 'x': return 6;
        case 'y': return 18;
        case 'z': return 19;
        case '&': return 26;
        default:
          return null;
      }
  }

}
