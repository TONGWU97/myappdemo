// 渐隐渐现效果，From简书@楠楠_c811
import React from 'react';
// 封装组件
class FadeGradually extends React.Component {
    constructor(props) {
        super(props);
        // 设置初始透明度为1
        this.state = { 
            opacity: 1.0 
        };
    }
    // 组件渲染后调用
    componentDidMount() {
        // 设置定时器并赋值给 timer
        let timer = setInterval(function () {
            // 为当前透明度赋值为 opacity
            let opacity = this.state.opacity;
            // 设置 opacity每300毫秒 -=0.1，以区别显示效果
            opacity -= 0.1;
            // 判断透明度是否小于0.1，如果小于就变为1
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            // 设置需要改变的数据
            this.setState({
                opacity: opacity
            });
            // 在定时器中绑定this，确保每次this指向一样
        }.bind(this), 300);
    }

    render() {
        return (
            // 将最新的 opacity 复制给当前 opacity
            <div style={{ opacity: this.state.opacity }}>
                {/* 从外部取name值 */}
                FadeGradually{this.props.name}
            </div>
        );
    }
}

export default FadeGradually;