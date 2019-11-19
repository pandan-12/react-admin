import logo from './logo.png';
import React, { Component } from 'react';
import './index.less'

const { Item } = Form;



export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1></h1>
        </header>
        <section className='login-section'>
          <h3>用户登录</h3>
          <Form>
            <Item>

            </Item>
          </Form>
        </section>
      </div>
    )
  }
}