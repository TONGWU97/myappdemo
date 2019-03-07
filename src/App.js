import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Vote from './Vote';
import BidirectionalBinding from './Bidirectional-binding';
import FadeGradually from './FadeGradually';
// import './reset.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Clock/>
        <Vote title='投票栏1'/>
        <Vote title='投票栏2'/> */}
        <BidirectionalBinding/>
        {/* <FadeGradually name='aaaa'/> */}
      </div>
      
    );
  }
}

export default App;
