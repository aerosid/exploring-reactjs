import React from 'react';
import {redux} from './Redux.mjs'

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quote: { id: '\u00A0', message: '\u00A0', author: '\u00A0'}};
  }
  componentDidMount() {
    //See:
    //https://stackoverflow.com/questions/50162522/cant-call-setstate-on-a-component-that-is-not-yet-mounted
    redux.addListener(this.#handleUpdate)
  }
  #handleUpdate = (state) => {
    console.log(`Quote.handleUpdate: ${JSON.stringify(state)}`);    
    this.setState({quote: state});
    return;
  }  
  render = () => {
    //See:
    //https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
    let quote = this.state.quote;
    return (
      <div id="quote-div">
        <p id="quote-id" style={{paddingLeft: "1rem", font: "normal 1rem Arial"}}>{quote.id}</p>
        <p id="quote-message" style={{paddingLeft: "1rem", font: "bold 1rem Arial"}}>{quote.message}</p>
        <p id="quote-author" style={{paddingLeft: "1rem", font: "normal 1rem Arial"}}>{quote.author}</p>
      </div>
    );
  }
}

export default Quote;