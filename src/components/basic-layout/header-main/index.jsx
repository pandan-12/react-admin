import React, { Component } from 'react'
import { Button, Icon } from 'antd';
import './index.less';
import screenfull from 'screenfull'; // 切换全屏


export default class HeaderMain extends Component {
  state = {
    isFullscreen: false
  };


  toggleScreen = () => {
    screenfull.toggle();
  };

  change = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  }

  componentDidMount() {
    screenfull.on('change', this.change);
  }


  componentWillUnmount() {
    //解绑事件 解绑事件的回调函数和绑定事件的回调函数必须一致
    screenfull.off('change', this.change); //解绑必须是同一个函数,所以直接定义change函数,这样再传给on和off
  }

  render() {
    const { isFullscreen } = this.state;

    return (
      <div className='header-main'>
        <div className='header-main-top'>
          <Button size='small' onClick={this.toggleScreen}><Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"} /></Button>
          <Button size='small' className='language-btn'>English</Button>
          <span>hello,shadiao</span>
          <Button type='link' size='small'>退&nbsp;&nbsp;出</Button>
        </div>
        <div className='header-main-bottom'>
          <h3>首页</h3>
          <span>我楞尼玛败讲了可照来</span>
        </div>
      </div>
    )
  }
}
