import React, { Component } from 'react';
import logo from '../../../assets/logo.png';
import { Menu, Icon } from 'antd';
import menus from '../../../config/menus.js';
import { Link } from 'react-router-dom';
import './index.less'


const { SubMenu } = Menu;


export default class Leftnav extends Component {
  state = {
    menus: []
  };

  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.icon}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {/* {menu.children.map(cMenu => {
              return this.createCMenus(cMenu)
            })} */}
            {menu.children.map(cMenu => this.createCMenus(cMenu))}
          </SubMenu>
        );
      } else {
        return this.createCMenus(menu)
      }
    });
  }

  createCMenus = menu => {
    return <Menu.Item key={menu.icon}>
      <Link to={menu.path}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Menu.Item>
  }

  componentDidMount() { // 挂载完再调用一次render渲染
    this.setState({
      menus: this.createMenus(menus)
    });
  }

  render() {
    return (
      <div>
        <div className='layout-logo'>
          <img src={logo} alt="logo" />
          <h1 id="layout-logo-title">硅谷后台</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {this.state.menus}
          {/* 第一次调用render还是初始状态的空数组,挂载完后的menus值已经是个数组(如果是个数组,会自动遍历) */}
        </Menu>
      </div>
    )
  }
}
