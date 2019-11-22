export default [{
    title: '首页',
    icon: 'home',
    path: '/'
  },
  {
    title: '商品',
    icon: 'appstore',
    children: [{
        title: '分类管理',
        icon: 'bars',
        path: '/category'
      },
      {
        title: '商品管理',
        icon: 'tool',
        path: '/product'
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'user',
    path: '/user'
  },
  {
    title: '权限管理',
    icon: 'safety',
    path: '/role'
  },
  {
    title: '图形列表',
    icon: 'area-chart',
    children: [{
        title: '柱状图',
        icon: 'bar-chart',
        path: '/chart/bar'
      },
      {
        title: '折线图',
        icon: 'line-chart',
        path: '/chart/line'
      },
      {
        title: '饼状图',
        icon: 'pie-chart',
        path: '/chart/pie'
      }
    ]
  }
]