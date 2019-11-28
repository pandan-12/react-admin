import Home from '../components/home';
import Login from '../containers/login';
import NotMatch from '../components/not-match';
import Category from '../containers/category';


// 需要进行权限校验
const authRoutes = [{
    path: '/',
    component: Home,
    exact: true
  },

  {
    path: '/category',
    component: Category,
    exact: true
  },

  {
    //不写path路径 就会匹配所有
    component: NotMatch, // 404组件必须是最后一个 要加只能在前面
  }

]

// 需要进行权限校验
const noAuthRoutes = [{
  path: '/login',
  component: Login,
  exact: true
}, ]

export {
  authRoutes,
  noAuthRoutes
}