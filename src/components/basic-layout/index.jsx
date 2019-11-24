import React, { Component } from 'react';
import { Layout } from 'antd';
import Leftnav from './left-nav/index'

import HeaderMain from './header-main'

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
    this.logoTitle.classList.toggle('text-title')
  };

  componentDidMount() {
    this.logoTitle = document.getElementById('layout-logo-title')
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Leftnav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <HeaderMain />
          <Content style={{ margin: '40px 16px 0 16px' }}>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;