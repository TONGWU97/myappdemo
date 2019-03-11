import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Vote from './Vote';
import BidirectionalBinding from './Bidirectional-binding';
import FadeGradually from './FadeGradually';
import A from './LifeCycle/A';
import Panel from './复合组件间的信息传递';
// import './reset.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock/>
        <Vote title='投票栏1'/>
        <BidirectionalBinding/>
        <FadeGradually name='aaaa'/>
        {/* <A/> */}
        <Panel/>
      </div>
      
    );
  }
}

export default App;
