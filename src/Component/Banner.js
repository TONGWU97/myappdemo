import React, { Component } from 'react';
import PropTypes from 'prop-types'; //用来设置属性规则的
import '../Banner.css';

export default class Banner extends React.Component {
    // 设置属性的默认值和规则
    static defaultProps = {
        data: [],
        interval: 3000,
        step: 1,
        speed: 300
    };
    static propTypes = {
        data: PropTypes.array,
        interval: PropTypes.number,
        step: PropTypes.number,
        speed: PropTypes.number
    }
    constructor(props) {
        super(props);
    }

    // 实现数据的克隆(只需要在渲染前克隆一次即可)
    componentWillMount() {
        let { data } = this.props;
        // 克隆数组
        let cloneData = data.slice(0);
        cloneData.push(data[0]);
        cloneData.unshift(data[data.length - 1]);
        // 将当前克隆的数据挂载到实例上,供其他方法调用
        this.cloneData = cloneData;
    }

    render() {
        let { data } = this.props,
            { cloneData } = this;
        if (data.length === 0) {
            return '';
        }
        // 轮播图整体容器
        return <section className='container'>
            {/* 轮播图滚动播放的图片,wrapper的宽度取决于要展示图片的数量 */}
            <ul className='wrapper'>
                {cloneData.map((item, index) => {
                    let { title, pic } = item;
                    return <li key={index}>
                        <img src={pic} alt={title} />
                    </li>;
                })}

            </ul>
            {/* 焦点(点击切换图片部分) */}
            <ul className='focus'>
                {data.map((item, index) => {
                    return <li key={index}></li>
                })}
            </ul>
            {/* 轮播图上左右按钮 */}
            <a href="javascript:;" className="arrow arrowLeft"></a>
            <a href="javascript:;" className="arrow arrowRight"></a>
        </section>
    }
}
