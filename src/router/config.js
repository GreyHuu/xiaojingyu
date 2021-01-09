import TabsView from '@/layouts/tabs/TabsView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/list/query',
      meta: {
        page: {
          title: '小鲸鱼问诊平台'
        }
      },
      children: [
        {
          path: 'list',
          name: '管理',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '病症管理',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/xiaojingyu/QueryList'),
            },
            {
              path: 'search',
              name: '病症细分管理',
              component: () => import('@/pages/xiaojingyu/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: '症状',
                  component: () => import('@/pages/xiaojingyu/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: '用药',
                  component: () => import('@/pages/xiaojingyu/search/ApplicationList'),
                },
              ]
            }
          ]
        },
        {
          path: 'components',
          name: '内置组件',
          meta: {
            icon: 'appstore-o'
          },
          component: PageView,
          children: [
            {
              path: 'taskCard',
              name: '任务卡片',
              component: () => import('@/pages/components/TaskCard')
            },
            {
              path: 'palette',
              name: '颜色复选框',
              component: () => import('@/pages/components/Palette')
            },
            {
              path: 'table',
              name: '高级表格',
              component: () => import('@/pages/components/table')
            }
          ]
        },
      ]
    },
  ]
}

export default options
