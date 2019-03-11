import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// 在Panel里包含Head和Body，Head中包含“点击次数”，Body中包含一个按钮，想实现在Body中点击按钮Head中的点击次数随之增加
// 父组件把信息传递给子组件：基于属性传递即可(而且传递是单方向的，只能父亲通过属性把信息给儿子，儿子不能直接把信息作为属性传递给父亲)
class Panel extends React.Component {
    constructor() {
        super();
        this.state = {
            n: 0
        };
    }

    fn = () => {
        // 修改Panel的状态信息
        this.setState({
            n: this.state.n + 1
        })
    }

    render() {
        return <section className='panel panel-default'>
            {/* 父组件基于属性把信息传递给子组件 */}
            <Head count={this.state.n} />
            {/* 父组件把自己的一个方法基于组件传递给子组件，目的是在子组件中执行这个方法 */}
            <Body callBack={this.fn}/>
        </section>
    }
}

// Head
class Head extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='panel-heading'>
            <h3 className='panel-title'>
                {/* 子组件通过属性获取父组件传递的内容 */}
                点击次数: {this.props.count}
            </h3>
        </div>
    }
}

// Body
class Body extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='panel-body'>
            <button className='btn btn-success' onClick={this.props.callBack}>
                点我啊！
        </button>
        </div>
    }
}

export default Panel;