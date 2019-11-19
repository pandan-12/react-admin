import Home from '../components/home';
import Login from '../components/login';
import NotMatch from '../components/not-match'

export default [{
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    //不写path路径 就会匹配所有
    component: NotMatch, // 404组件必须是最后一个 要加只能在前面
  }
]