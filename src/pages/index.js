import React from "react"
import { graphql } from "gatsby"
import autosize from "autosize";
import Layout from "../components/layout"

export default class TQCalculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({result:0,data:[]});
    this.textarea = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.textarea.focus();
    autosize(this.textarea);
  }

  handleChange(event) {

    this.setState({result: 0})
    this.setState({data:this.props.data.allCorrespondencesCsv.edges})

    var x = 0
    var filteredData = []

    for (var i = 0; i < this.textarea.value.length; i++) {
      x = x + this.calculateTQValue(this.textarea.value.toLowerCase().charAt(i))
    }

    this.setState(prevState=>({result: prevState.result + x}), function(){
      
      filteredData = this.state.data.filter((row,i) => {
        return row.node.value === String(this.state.result)
      })
      
      this.setState(prevState=>({data: filteredData}))
    })

  }

  render() {

    return (

    	<Layout>
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

      </div>
        
          {this.state.data.length !== 0 &&
            <div> 

              <h4>Other words from <i>Liber AL vel Legis</i> with the same value:</h4> 

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
          }
          

	      
	      </Layout>
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

export const IndexQuery = graphql`
  query {
    allCorrespondencesCsv{
      edges {
        node {
          word
          value
        }
      }
    }
  }
`
