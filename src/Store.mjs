import {configureStore} from '@reduxjs/toolkit';

const initialState = { id: '\u00A0', message: '\u00A0', author: '\u00A0'};
const reducer = (state = initialState, action) => {
  console.log(`Store.reducer: action: ${JSON.stringify(action)}`); 
  let newState = null;
  if (action.type === "update") {
    newState = { ...action.payload};
  } else {
    newState = { ...state};
  }  
  return newState;
}
const store = configureStore({ reducer: reducer });
export {store};