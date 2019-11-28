import React, { Component } from 'react'
import { Button, Icon, Modal } from 'antd';
import screenfull from 'screenfull'; // 切换全屏
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { removeItem } from '../../../utils/storage';
import { removeUserSuccess } from '../../../redux/action-creators/user'
import { withRouter } from 'react-router-dom';
import menus from '../../../config/menus.js';
import dayjs from 'dayjs';

import './index.less';

@withRouter
@connect((state) => ({
  username: state.user.user.username
  // 状态拿到所有数据,user拿到user数据(一个是token,一个是user),user是个对象拿到username
}), { removeUserSuccess })
@withTranslation()
class HeaderMain extends Component {
  formatDate = (date) => {
    date = new Date(date); //获取时间
    const year = date.getFullYear(); // 获取年份
    const month = this.addZero(date.getMonth() + 1); // 获取月份
    const day = this.addZero(date.getDate()); // 获取日期
    const hours = this.addZero(date.getHours()); // 获取小时
    const minutes = this.addZero(date.getMinutes()); // 获取分钟
    const seconds = this.addZero(date.getSeconds()); // 获取秒
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // 不到10前面补0
  addZero = number => {
    if (number < 10) return '0' + number;
    return number;
  }

  state = {
    isFullscreen: false,
    isEnglish: this.props.i18n.language === 'en' ? true : false,
    title: '',
    pathname: '',
    // date: this.formatDate(Date.now())
    date: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };



  toggleScreen = () => {
    screenfull.toggle();
  };

  change = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  }

  //切换语言
  changeLang = () => {
    const isEnglish = !this.state.isEnglish;
    this.setState({
      isEnglish
    })
    this.props.i18n.changeLanguage(isEnglish ? 'en' : 'zh');
  }

  //退出
  loginout = () => {
    Modal.confirm({
      title: '你特么确定要退？',
      onOk: () => {
        console.log(233)
        removeItem('user'); // 清空loaclStorage
        this.props.removeUserSuccess(); // 清空redux
        this.props.history.replace('/login') // 跳转到login页面
      }
    });
  }

  componentDidMount() {
    screenfull.on('change', this.change);
    this.timer = setInterval(() => { //只执行一次放在componentDidMount
      this.setState({
        // date: this.formatDate(Date.now())
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
  }

  componentWillUnmount() {
    //解绑事件 解绑事件的回调函数和绑定事件的回调函数必须一致
    screenfull.off('change', this.change); //解绑必须是同一个函数,所以直接定义change函数,这样再传给on和off

    clearInterval(this.timer); //解绑
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // getDerivedStateFromProps根据属性生成状态

    const { pathname } = nextProps.location;

    if (pathname === prevState.pathname) {
      // 说明地址没有更新  --> this.state
      return prevState;
    }
    //只有地址变了 才执行下面

    let title = '';

    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find((cMenu) => cMenu.path === pathname)
        if (cMenu) {
          title = cMenu.title;
          break; // 找到就退出
        }
      } else {
        if (menu.path === pathname) {
          title = menu.title;
          break;
        }
      }
    }

    //要求返回值必须是一个新的状态
    return {
      pathname,
      title: 'layout.leftNav.' + title
    }
  }


  render() {
    const { isFullscreen, isEnglish, title, date } = this.state;
    const { username, t } = this.props;
    return (
      <div className='header-main'>
        <div className='header-main-top'>
          <Button size='small' onClick={this.toggleScreen}><Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"} /></Button>
          <Button size='small' className='language-btn' onClick={this.changeLang}>{isEnglish ? '中文' : 'English'}</Button>
          <span>hello,{username}</span>
          <Button type='link' size='small' onClick={this.loginout}>退&nbsp;&nbsp;出</Button>
        </div>
        <div className='header-main-bottom'>
          <h3>{t(title)}</h3>
          <span>{date}</span>
        </div>
      </div>
    )
  }
}

export default HeaderMain