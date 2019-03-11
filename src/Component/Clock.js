import React from 'react';

class Clock extends React.Component {
    constructor() {
        super();
        // 初始化组件状态(都是对象类型的):要求我们在constructor中，需要把后期使用的状态信息全部初始化一下(约定俗成的语法规范)
        this.state = {
            time: new Date().toLocaleString()
        };
    }
    async componentDidMount() {
        // React生命周期函数之一:第一次组件渲染完成后触发(我们在这里只需要间隔1000ms把state状态中的time数据改变，这样React会自动帮我们把组件中的部分内容进行重新的渲染)
        setInterval(() => {
            /**
             * 在React中可以通过this.state.time = new Date().toLocaleString();来修改状态，但是
             * 并不会通知React重新渲染页面，所以不要这样去修改
             */
            this.setState({
                time: new Date().toLocaleString()
            }, () => {

            });
        }, 1000);
    }
    render() {
        return <section>
            <h3>当前时间为:</h3>
            <div style={{color:'red', fontWeight:'bold'}}>
            {this.state.time}
            </div>
        </section>;
    }
}

export default Clock;