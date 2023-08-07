import React from 'react';
import apiEndpoint from './ApiEndpoint.mjs';
import {redux} from './Redux.mjs'

class Requester extends React.Component {
  static #OK = "OK";
  static #REQUESTING = "REQUESTING";
  constructor(props) {
    super(props);
    this.state = {status: Requester.#OK};
  }
  onClick = async (event) => {
    this.setState({status: Requester.#REQUESTING});
    let quote = await apiEndpoint.nextQuote();
    this.setState({status: Requester.#OK});
    redux.update(quote);
    event.stopPropagation();
    return;
  }
  render = () => {
    let requestStatusStyle = {paddingRight: "0.8rem", font: "normal 0.8rem Arial"};
    let disabled = true;
    if (this.state.status === Requester.#OK) {
      requestStatusStyle = {display: "none", paddingRight: "0.8rem", font: "normal 0.8rem Arial"};
      disabled = false;
    }
    return (
      <div id="request-div" style={{float: "clear", overflow: "hidden"}}>
        <div style={{display: "inline", float: "right"}}>
          <span id="request-status" style={requestStatusStyle}>requesting ...</span>
          <button 
            id="request-button" 
            style={{font: "bold 1rem Arial"}} 
            disabled={disabled} 
            onClick={(event) => this.onClick(event)}>
            Request
          </button>
        </div>
      </div>
    );
  }
}

export default Requester;