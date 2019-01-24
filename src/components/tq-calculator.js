import React from 'react';

export default class TQValueCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({result:0});
    this.input = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.input.current.focus();
  }

  handleChange(event) {

    this.setState({result: 0})
    var x = 0

    for (var i = 0; i < this.input.current.value.length; i++) {
      x = x + this.calculateTQValue(this.input.current.value.toLowerCase().charAt(i))
    }

    this.setState(prevState=>({result: prevState.result + x}))

  }

  render(){

   return(
      <div id="calculator">
        
          <input
            type="text"
            name="word"
            placeholder='Type here...'
            defaultValue = ''
            ref={this.input}
            onChange={this.handleChange}
            >
          </input>
      
         <p className="result">
            {this.state.result}
         </p>
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
