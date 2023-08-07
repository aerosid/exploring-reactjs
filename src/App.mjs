import React from 'react';
import Header from './Header.mjs'
import Quote from './Quote.mjs';
import Requester from './Requester.mjs';

class App extends React.Component {

  render = () => {
    return (
      <div>
        <Header />
        <Quote />
        <Requester />
      </div>
    );
  }

}

export default App;
