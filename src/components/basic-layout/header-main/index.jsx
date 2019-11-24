import React, { Component } from 'react'
import { Button, Icon } from 'antd';
import './index.less';

export default class HeaderMain extends Component {
  render() {
    return (
      <div className='header-main'>
        <div className='header-main-top'>
          <Button size='small'><Icon type="fullscreen" /></Button>
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
