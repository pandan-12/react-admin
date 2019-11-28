import React, { Component } from 'react'
import { Icon } from 'antd';
import './index.less'

export default class ThemePicker extends Component {
  render() {
    return (
      <div className='theme-picker' onClick={this.theme}>
        <Icon type="setting" />

      </div>
    )
  }
}

