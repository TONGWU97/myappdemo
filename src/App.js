import React, { Component } from 'react';
import './App.css';
import Clock from './Component/Clock';
import Vote from './Component/Vote';
import BidirectionalBinding from './Component/Bidirectional-binding';
import FadeGradually from './Component/FadeGradually';
import A from './LifeCycle/A';
import Panel from './Component/复合组件间的信息传递';
import Banner from './Component/Banner';
// import './reset.min.css';

let IMG_DATA = [];
for (let i = 1; i <= 4; i++) {
  IMG_DATA.push({
      id: i,
      title: '',
      pic: require(`./images/banner${i}.jpeg`)
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
        <Vote title='投票栏1' />
        <BidirectionalBinding />
        <FadeGradually name='aaaa' />
        {/* <A/> */}
        <Panel />
        {/* data:轮播图需要绑定的数据
        interval:自动轮播间隔的时间(默认3000ms)
        step:默认展示图片的索引(记住前后各克隆了一张)
        speed:每一张切换所需的运动时间
        */}
        <Banner data={IMG_DATA}
                interval={3000}
                step={1}
                speed={300} />
      </div>

    );
  }
}

export default App;
