import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supporter: 0,
            opponent: 0
        };
    }

    render() {
        let { supporter, opponent } = this.state,
            rate = (supporter + opponent) === 0 ? '0%' : ((supporter / (supporter + opponent) * 100).toFixed(2) + '%');
        return <section className='panel panel-default' style={{ width: '40%', margin: '20px auto' }}>
            <div className='panel-heading'>
                <h3 className='panel-title'>{this.props.title}</h3>
                <div className='panel-body'>
                    支持人数：{supporter}
                    <br /><br />
                    反对人数：{opponent}
                    <br /><br />
                    支持率：{rate}
                </div>
                <div className='panel-footer'>
                    <button className='btn btn-success'
                        onClick={this.support}>支持
                </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger'
                        onClick={this.against}>反对
                </button>
                </div>
            </div>
        </section>
    }
    support = ev => this.setState({ supporter: this.state.supporter + 1 });
    against = ev => this.setState({ opponent: this.state.opponent + 1 });
}

export default Vote;

// 引入bootstrap之后需要在webpack中添加对应的css loader和url loader
// npm install css-loader style-loader
// npm install url-loader