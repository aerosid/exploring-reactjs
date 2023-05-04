import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const initialState = { color: "red" };

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  if (action.type === "flipColor") {
    let value = (state.color === "red") ? "blue" : "red";
    newState = { ...state, color: value };
  }  
  return newState;
}

const store = configureStore({ reducer: reducer });

const flipColor = () => { return { type: "flipColor", payload: null }; };

const addListener = (listener) => {
  store.subscribe(() => { listener(store.getState()); });
};

const dispatch = store.dispatch;

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: initialState.color};
    addListener(this.handleStoreUpdate);
  }
  handleStoreUpdate = (globalState) => {
    let prevColor = this.state.color;
    let currColor = globalState.color;
    if (currColor !== prevColor) {
      let update = { color: currColor };
      this.setState(update);
    }
  }
  onClick = (event) => {
    dispatch(flipColor());
  }
  render() {
    var style = (this.state.color === "red") ? {color: "red"} : {color: "blue"};
    var text = (this.state.color === "red") ? "I'm Red!" : "I'm Blue!";
    return (
      <h1 style={style} onClick={(event) => this.onClick(event)}>
        {text}
      </h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><Message/></Provider>);