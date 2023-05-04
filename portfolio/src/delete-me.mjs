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