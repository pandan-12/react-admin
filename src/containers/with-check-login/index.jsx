import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; //Redirect 在render中用这个组件跳转

const withCheckLogin = WrappedComponent => {
  return connect(
    // 第一次传状态数据和更新状态数据的方法
    state => ({ token: state.user.token }), // 状态数据
    null // 不要传null,要就传参
  )( // 调用两次,第二次传组件
    class extends Component {
      static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
      render() {

        const { token, location, ...rest } = this.props;
        // ...rest 剩下所有没有被解构赋值的参数
        // // 获取路径
        // const { pathname } = this.props.locaton;

        if (location.pathname === '/login') {
          if (token) {
            return <Redirect to='/' /> // 一定要加return 不加会重定向
          }
        } else {
          if (!token) {
            return <Redirect to='/login' />
          }
        }

        //不动
        //定义高阶组件时,需要将其接受到的props,在往下传递
        return <WrappedComponent {...rest} location={location} />
      }
    }
  )
}

export default withCheckLogin