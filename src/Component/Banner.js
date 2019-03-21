import React from 'react';
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

        let { step, speed } = this.props;
        this.state = {
            step,
            speed
        }
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

    // 控制自动轮播
    componentDidMount() {
        // 把定时器返回值挂载到实例上，方便后期清除，结束自动轮播
        this.autoTimer = setInterval(this.autoMove, this.props.interval);
    }

    componentWillUpdate(nextProps, nextState) {
        // 边界判断：如果最新修改的step索引大于最大索引(说明此时已经是末尾了，不能向后走了)
        if (nextState.step > this.cloneData.length - 1) {
            this.setState({
                step: 1,
                speed: 0
            })
        }
        // 向左边界判断：如果当前最新修改的索引已经小于零，说明不能继续向左走，我们应让其“立即”
        // 回到倒数第二张图片位置(真实的最后一张)(STEP=CLONE-DATA.LENGTH-2)
        if (nextState.step < 0) {
            this.setState({
                step: this.cloneData.length - 2,
                speed: 0
            })
        }
    }

    componentDidUpdate() {
        // 只有是从克隆的第一张立即切换到真实的第一张后，我们才让其从当前的第一张运动到第二张
        let { step, speed } = this.state;
        if (step === 1 && speed === 0) {
            let delayTimer = setTimeout(() => {
                this.setState({
                    step: step + 1,
                    speed: this.props.speed
                })
            }, 0)
        }
        //向左边界判断：立即回到倒数第二张后我们应让其再往回运动一张
        if (step === this.cloneData.length - 2 && speed === 0) {
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                this.setState({
                    step: step - 1,
                    speed: this.props.speed
                });
            }, 0);
        }
    }

    render() {
        let { data } = this.props,
            { cloneData } = this;
        if (data.length === 0) {
            return '';
        }

        // 控制wrapper的样式
        let { step, speed } = this.state,
            wrapperStyle = {
                width: cloneData.length * 1000 + 'px',
                left: -step * 1000 + 'px',
                transition: `left ${speed}ms linear 0ms`
            }
        // 轮播图整体容器,鼠标移入暂停移出继续轮播
        return <section className={'container'}
            onMouseEnter={this.movePause}
            onMouseLeave={this.movePlay}
            onClick={this.handleClick}>
            {/* 轮播图滚动播放的图片,wrapper的宽度取决于要展示图片的数量 */}
            <ul className={'wrapper'} style={wrapperStyle}
                // 当wrapper切换完成再去执行下一次切换任务，防止过快点击
                onTransitionEnd={() => {
                    this.isRun = false;
                }}>
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
                    // 焦点对齐
                    let tempIndex = step - 1;
                    if (step === 0) {
                        tempIndex = data.length - 1;
                    }
                    if (step === (cloneData.length - 1)) {
                        tempIndex = 0;
                    }
                    return <li className={tempIndex === index ? 'active' : ''} key={index} ></li>
                })}
            </ul>
            {/* 轮播图上左右按钮 */}
            <a href="javascript:;" className="arrow arrowLeft"></a>
            <a href="javascript:;" className="arrow arrowRight"></a>
        </section>
    }

    // 实现向右切换
    autoMove = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    // 自动轮播的暂停和开启
    movePause = () => {
        clearInterval(this.autoTimer);
    }
    movePlay = () => {
        this.autoTimer = setInterval(this.autoMove, this.props.interval);
    }

    // 事件委托处理click, ev是事件对象
    handleClick = ev => {
        let target = ev.target,
            targetTag = target.tagName,
            targetClass = target.className;
        // 左右切换按钮
        if (targetTag === 'A' && /(^| +)arrow( +|$)/.test(targetClass)) {
            // 防止过快点击
            if(this.isRun) return;
            this.isRun = true;
            // 右按钮
            if(targetClass.indexOf('arrowRight') >= 0) {
                this.autoMove();
                return;
            }
            // 左按钮
            this.setState({
                step: this.state.step - 1
            })
            return;
        }
    }
}


