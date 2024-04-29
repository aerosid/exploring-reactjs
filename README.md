# README
Create project:
```bash
npx create-react-app portfolio
cd portfolio
npm start
```
## 1. Hello World
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

function Message(props) {
  return <h1>Hello World!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Message/>);
```

## 2. Re-Render on Click
Function component:
```javascript
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Label(props) {
  const [color, setColor] = useState(props.color);
  var style = {color: color} ;
  var text = (color === "red") ? "I'm Red!" : "I'm Blue!";
  const onClick = () => {
    let newColor = (color === "red") ? "blue" : "red";
    setColor(newColor);
  }  
  return (
    <h1 style={style} onClick={onClick}>
      {text}
    </h1>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Label color="red"/>);
```
Class component:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: props.color};
  }
  onClick = (event) => {
    var update = (this.state.color === "red") ? {color: "blue"} : {color: "red"};
    this.setState(update);
  }
  render = () => {
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
root.render(<Message color="red"/>);
```
## 3. Parent-Child Event Propagation
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.onClick.bind(this);
  }

  onClick(event) {
    const value = event.target.getAttribute("data-src");
    console.log("data-src: " + value);
    return;
  }

  render() {
    var color = this.props.color;
    var border = "1px solid" + " " + color;
    var style = { "border": border, "padding": "4px" };
    return (
      <div style={style} onClick={(event) => this.onClick(event)}>
        <p data-src="content">Content</p>
      </div>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: props.color};
    this.onClick.bind(this);
  }

  onClick(event) {
    const value = event.target.getAttribute("data-src");
    console.log("data-src: " + value);
    var update = (this.state.color === "red") ? {color: "blue"} : {color: "red"};
    this.setState(update);
    event.stopPropagation();
  }

  render() {
    var color = this.state.color;
    var border = "1px solid" + " " + color;
    var style = { "border": border, "color": color, "padding": "4px" };
    return (
      <div style={style} onClick={(event) => this.onClick(event)}>
        <h1 data-src="header">Header:</h1>
        <Content color={color}/>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header color="blue"/>);
```

## 4. useState, useEffect and useCallback
```javascript
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

function Label(props) {
  const [color, setColor] = useState(props.color);
  const setup = useCallback(() => { console.log("setup(): " + color); }, [color]);
  const teardown = useCallback(() => { console.log("teardown(): " + color); }, [color]);
  useEffect(() => { setup(); return teardown; }, [color, setup, teardown]);
  var style = {color: color} ;
  var text = (color === "red") ? "I'm Red!" : "I'm Blue!";
  const onClick = () => {
    let newColor = (color === "red") ? "blue" : "red";
    setColor(newColor);
  }
  return (
    <h1 style={style} onClick={onClick}>
      {text}
    </h1>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Label color="red"/>);
```
## 5. Promise
```javascript
class Job {
  constructor(name, period) {
    this.name = name;
    Number.isInteger(period) ? this.period = period : this.period = 0;
  }
  static promise(name, period) {
    let job = new Job(name, period);
    return new Promise(job.executor);
  }
  executor = (resolve, reject) => {
    let onTimeout = () => {
      resolve(this.name);
    }
    this.timeout = window.setTimeout(onTimeout, this.period);
  }
  getName = () => { return this.name; };
  getPeriod = () => { return this.period; };
}
let promise = Job.promise("A", 1000);
let onA = (value) => { console.log(value + ": succeeded"); return Job.promise("B", 1000); };
let onB = (value) => { console.log(value + ": succeeded"); return Job.promise("C", 1000); };
let onC = (value) => { console.log(value + ": succeeded"); return value; };
let onDone = () => { console.log("All done"); };
let onError = (error) => { console.log(error.message); };
let doCompositeJob = async () => {
  let object = await promise.then(onA).then(onB).then(onC).catch(onError).finally(onDone);
  console.log(object);
  return object;
}
doCompositeJob();
```
## 6. Redux
### 6.1. Simple Store
```javascript
import pkg from '@reduxjs/toolkit';
const {configureStore} = pkg;
class Redux {
  #initialState;
  #store;
  constructor() {
    this.#initialState = { counter: 0 };
    this.#store = configureStore({ reducer: this.#reducer });
  }
  static build() {
    const redux = new Redux();
    return redux;
  }
  addListener = (listener) => {
    this.#store.subscribe(() => { listener(this.#getState()); });
    return this;
  }
  doIncrement = () => {
    const action = { type: "increment" };
    this.#store.dispatch(action);
    return;
  }
  #getState = () => {
    return this.#store.getState();
  }
  #reducer = (state = this.#initialState, action) => {
    let newState = { ...state };
    console.log(`action.type: ${action.type}`);
    if (action.type === "increment") {
      let value = state.counter + 1;
      newState = { ...state, counter: value };
    } 
    return newState;
  }
}
class Component {
  #redux
  constructor(redux) {
    this.#redux = redux;
    this.#redux.addListener(this.#handleUpdate);
  }
  static build(redux) {
    const component = new Component(redux);
    return component;
  }
  #handleUpdate = (state) => {
    console.log(`counter: ${state.counter}`);
    return;
  }
  onClick = () => {
    this.#redux.doIncrement();
    return;
  } 
}
const redux = Redux.build();
const comp = Component.build(redux);
comp.onClick();
comp.onClick();
```
### 6.2. Thunk/Async Logic
```javascript
import pkg from '@reduxjs/toolkit';
const {configureStore, createAsyncThunk} = pkg;
class Job {
  constructor(name, period) {
    this.name = name;
    Number.isInteger(period) ? this.period = period : this.period = 0;
  }
  static promise(name, period) {
    let job = new Job(name, period);
    return new Promise(job.#executor);
  }
  #executor = (resolve, reject) => {
    let onTimeout = () => {
      resolve(this.name);
    }
    this.timeout = setTimeout(onTimeout, this.period);
  }
}
class Redux {
  #initialState;
  #store;
  constructor() {
    this.#initialState = { counter: 0 };
    this.#store = configureStore({ reducer: this.#reducer });
  }
  static build() {
    const redux = new Redux();
    return redux;
  }
  addListener = (listener) => {
    this.#store.subscribe(() => { listener(this.#getState()); });
    return this;
  }
  #doIncrementCallback = async (props, thunkAPI) => {
    let value = await Job.promise(props.name, props.period);
    return value;
  };
  #doIncrementThunk = createAsyncThunk('default', this.#doIncrementCallback);
  doIncrement = (props) => {
    this.#store.dispatch(this.#doIncrementThunk(props));
    return;
  }
  #getState = () => {
    return this.#store.getState();
  }
  #reducer = (state = this.#initialState, action) => {
    let newState = { ...state };
    console.log(`action.type: ${action.type}`);
    if (action.type === "default/fulfilled") {
      let value = state.counter + 1;
      newState = { ...state, counter: value };
    }
    return newState;
  }
}
class Component {
  #redux
  constructor(redux) {
    this.#redux = redux;
    this.#redux.addListener(this.#handleUpdate);
  }
  static build(redux) {
    const component = new Component(redux);
    return component;
  }
  #handleUpdate = (state) => {
    console.log(`counter: ${state.counter}`);
    return;
  }
  onClick = () => {
    const props = {name: "A", period: 5000};
    this.#redux.doIncrement(props);
    return;
  }
}
const redux = Redux.build();
const comp = Component.build(redux);
comp.onClick();
```
## 7. React-Redux
Function component:
```javascript
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const initialState = { color: "red" }

const reducer = function(state = initialState, action) {
  let newState = { ...state };
  if (action.type === "flip") {
    let value = (state.color === "red") ? "blue" : "red";
    newState = { ...state, color: value };
  }
  return newState;
}

const store = configureStore({ reducer: reducer });

const action = { type: "flip" };

const actionCreator = () => { return action; };

const selector = (state) => { return state.color; };

function Label(props) {
  const color = useSelector(selector);
  const dispatch = useDispatch();
  const style = {color: color} ;
  const text = (color === "red") ? "I'm Red!" : "I'm Blue!";
  const onClick = () => { dispatch(actionCreator()); };
  return (
    <h1 style={style} onClick={onClick}>
      {text}
    </h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><Label/></Provider>);
```
Class component:
```javascript
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
```
## Note(s)
```bash
Playwrite: https://github.com/microsoft/playwright
Installation: https://github.com/microsoft/playwright#manually
npm i -D @playwright/test
# install supported browsers
npx playwright install
Run Test:
npx playwrite test


```