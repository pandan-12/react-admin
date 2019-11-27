import React, { Component } from 'react';
import logo from '../../../assets/logo.png';
import { Menu, Icon } from 'antd';
import menus from '../../../config/menus.js';
import { withTranslation } from 'react-i18next'

import { Link, withRouter } from 'react-router-dom';
// withRouter给非路由组件传递路由组件的三大属性
import './index.less'


const { SubMenu } = Menu;

@withTranslation() // 调两次
@withRouter // 只要调用一次
class Leftnav extends Component {
  createMenus = menus => {
    const { t } = this.props;
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{t('layout.leftNav.' + menu.title)}</span>
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
    const { t } = this.props;
    return <Menu.Item key={menu.path}>
      <Link to={menu.path}>
        <Icon type={menu.icon} />
        <span>{t('layout.leftNav.' + menu.title)}</span>
      </Link>
    </Menu.Item>
  };

  findOpenKey = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find((cMenu) => cMenu.path === pathname);
        if (cMenu) {
          return menu.path; // 返回的是父菜单组件
        }
      }
    }
  }



  render() {
    const { pathname } = this.props.location;

    const openKey = this.findOpenKey(menus, pathname);

    const { t } = this.props;

    //重复调用
    const menusList = this.createMenus(menus)
    return (
      <div>
        <div className='layout-logo'>
          <img src={logo} alt="logo" />
          <h1 id="layout-logo-title">{t('layout.leftNav.title')}</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
          {menusList}
          {/* 第一次调用render还是初始状态的空数组,挂载完后的menus值已经是个数组(如果是个数组,会自动遍历) */}
        </Menu>
      </div>
    )
  }
}

export default Leftnav;