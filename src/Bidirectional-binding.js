// 在React中实现双向的数据绑定，基于表单元素的onChange实现MVVM双向绑定
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class BidirectionalBinding extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '请输入文本'
        };
    }
    // 设置一秒后文本内容变为‘欢迎光临！’,实现数据影响视图
    componentDidMount() {
        setTimeout(() => {
            this.setState({text: '欢迎光临！'});
        }, 1000);
    }

    render() {
        // 解构赋值
        let { text } = this.state;
        return <section className='panel panel-default'>
            <div className='panel-heading'>
                <input type='text' 
                className='form-control' 
                value={text} onChange={ev => {
                    // 在文本框的onChange中修改状态信息，实现视图改变数据，ev是当前事件对象
                    // 当input中的内容修改了以后，className='panel-body'里的内容也跟着变化
                    this.setState({
                        text: ev.target.value
                    });
                }}/>
            </div>
            <div className='panel-body'>
                {text}
            </div>
        </section>
    }
}

export default BidirectionalBinding;