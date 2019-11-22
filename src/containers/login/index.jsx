import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { getUserAsync } from '../../redux/action-creators/user'
// import { reqLogin } from '../../api/index';
import { setItem } from '../../utils/storage'
import logo from '../../assets/logo.png';
import './index.less'

const { Item } = Form; //提取From其中的组件Item


// export default class Login extends Component {

@connect(null, { getUserAsync })
@Form.create()
class Login extends Component {
  /**
   * rule校验哪个input 同一个函数可以绑定多个 通过rule来判断
   * value 当前值
   * callback 不管成功与否,必须调用的函数
   * callback() 直接调用代表校验成功
   * callback('参数') 传参数代表校验失败
   */
  validator = (rule, value, callback) => {

    const name = rule.field === 'username' ? '用户名' : '密码'

    if (!value) {
      //如果没有值
      callback(`请输入${name}`);
    } else if (value.length > 12) {
      callback(`${name}长度不能超过12位`)
    } else if (value.length < 4) {
      callback(`${name}长度至少4位`)
    } else if (!/\w/.test(value)) {
      callback(`${name}只能包含英文,数字,下划线`)
    } else {
      callback();
    }
  }

  login = (e) => {
    console.log(1);

    const { form } = this.props;

    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(1);
        const { username, password } = values; // 拿到valus
        this.props.getUserAsync(username, password)
          .then(response => {
            // 持久化存储用户数据
            setItem('user', response)
            this.props.history.push('/'); // 成功就跳转网址
          })
          .catch((err) => {
            form.resetFields(['password']); // 失败就清空数据
          })
      }
    })
  }

  render() {
    //getFieldDecorator方法也是一个高阶组件用法
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h3>用户登录</h3>
          <Form onSubmit={this.login}>
            <Item>
              {
                getFieldDecorator( //第一次传字符串,第二次传校验对象
                  'username', //key值,是rule的值也是将来获取数据的
                  {
                    rules: [
                      //适用于只有一条校验规则
                      // {
                      //   required: true, //必填
                      //   message: '请输入用户名'
                      // },
                      // {
                      //   min: 6, message: '请输入六位以上'
                      // },
                      // {
                      //   max: 12, message: '请输入12位以下'
                      // },
                      // {
                      //   pattern: /\w/,
                      //   message: '用户名只能包含英文,数字,下划线'
                      // }
                      {
                        //适用于多条校验规则,可复用
                        validator: this.validator
                      }
                    ]
                  }
                )(
                  <Input
                    prefix={
                      <Icon type="user" className='login-icon' />
                    }
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules: [
                      {
                        validator: this.validator
                      }
                    ]
                  }
                )(
                  <Input
                    prefix={
                      <Icon type="lock" className='login-icon' />
                    }
                    type='password'
                    placeholder="密码"
                  />
                )
              }
            </Item>
            <Item>
              <Button type='primary' className='login-btn' htmlType='submit'>登录</Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

//高阶组件 作用: 给组件绑定Form属性
// export default Form.create()(Login);


// connect(bull, { getUserAsync })(Login);
// 简化要少调用一次

export default Login;