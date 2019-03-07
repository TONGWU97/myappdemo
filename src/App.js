import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Vote from './Vote';
// import './reset.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock/>
        <Vote title='投票栏1'/>
        <Vote title='投票栏2'/>
      </div>
      
    );
  }
}

export default App;
