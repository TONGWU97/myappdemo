import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class A extends React.Component {
    // static defaultProps = {}; //第一个执行的，执行完成后(给属性设置默认值后)才向下执行
    constructor() {
        super();
        console.log('1=CONSTRUCTOR');
        this.state = {
            n: 1
        };
    }
    componentWillMount() {
        console.log('2=WILL-MOUNT:第一次渲染之前', this.refs.HH);//第一次渲染前，没有HH undefined
    }
    componentDidMount() {
        console.log('4=DID-MOUNT:第一次渲染之后', this.refs.HH);//第一次渲染后，有HH <div>
        /**
         * 真实项目中这个阶段一般做如下处理：
         * 1.控制状态信息更改的操作
         * 2.从服务器获取数据，然后修改状态信息，完成数据绑定
         * ...
         */
        // 状态信息在之前的信息里每隔2秒累加1
        setInterval(() => {
            this.setState({ n: this.state.n + 1 });
        }, 5000);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('5=是否允许更新，函数返回true是允许，返回false是不允许');
        // 只允许更新2次
        // if (this.state.n > 3) 在这个钩子函数中获取的state不是最新修改的而是上一次的state
        // 例如：第一次加载完成5000ms后我们基于setstate把n修改为2，但是此处获取的还是1
        // 解决办法：shouldComponetUpdate方法有两个参数
        // nextProps：最新修改的属性信息   nextState：最新修改的状态信息
        // 真实项目中用shouldComponentUpdate防止多次重复的渲染组件而消耗性能
        if (nextState.n > 3) {
            return false;
        }
        return true;
    }
    componentWillUpdate() {
        // 里面拿到的this.state.n是更新之前的，和shouldComponentUpdate一样有两个参数
        console.log('6=组件更新之前', this.state.n, nextState);
    }
    componentDidUpdate() {
        // 里面拿到的this.state.n是更新之后的
        console.log('8=组件更新之后', this.state.n);
    }
    render() {
        console.log('RENDER');
        return <div ref='HH'>
            {this.state.n}
        </div>
    }
}

export default A;