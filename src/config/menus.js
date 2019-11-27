export default [{
    title: 'home',
    icon: 'home',
    path: '/'
  },
  {
    title: 'products',
    icon: 'appstore',
    path: '/products',
    children: [{
        title: 'category',
        icon: 'bars',
        path: '/category'
      },
      {
        title: 'product',
        icon: 'tool',
        path: '/product'
      }
    ]
  },
  {
    title: 'user',
    icon: 'user',
    path: '/user'
  },
  {
    title: 'role',
    icon: 'safety',
    path: '/role'
  },
  {
    title: 'charts',
    icon: 'area-chart',
    path: '/charts',
    children: [{
        title: 'bar',
        icon: 'bar-chart',
        path: '/chart/bar'
      },
      {
        title: 'line',
        icon: 'line-chart',
        path: '/chart/line'
      },
      {
        title: 'pie',
        icon: 'pie-chart',
        path: '/chart/pie'
      }
    ]
  }
]