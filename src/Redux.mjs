import {store} from './Store.mjs'

class Redux {
  addListener = (listener) => {
    store.subscribe(() => { listener(store.getState()); });
    return this;
  }
  update = (quote) => {
    const action = { type: "update", payload: quote };
    store.dispatch(action);
    return;
  }
}

const redux = new Redux();
export {redux};