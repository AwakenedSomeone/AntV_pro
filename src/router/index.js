import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 路由配置说明
 * name: 'router-name'           必须配置，一系列路由匹配及keep-alive路由都基于此配置
 * meta : {
    title: 'title'               静态路由配置显示名称，注意配置为i18n的
    noCache: false               是否缓存，设置为true，则不缓存页面
    noTagsView: false            设置为true则路由不会展示在tags-view面板
    affix: true                  true 则一直显示在tags-view面板
    alias: 'system::user'        权限别名, 填了代表控制权限
    hidden: 'false'              设置为true则不会显示在菜单上
    highlightName: ''            高亮的菜单
  }
 */
const routes = [
  {
    path: '/',
    component: () =>import( '@/views/home.vue'),
    redirect: {
      name: 'bar',
    },
    children: [
      {
        path: 'bar',
        name: 'bar',
        component: () =>import( '@/views/bar/index.vue'),
      },
      {
        path: 'pie',
        name: 'pie',
        component: () =>import( '@/views/pie/index.vue'),
      },
      {
        path: 'line',
        name: 'line',
        component: () =>import( '@/views/line/index.vue'),
      }
    ]
  },
]
const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior: () => ({ x: 0, y: 0 }),
})


export default router
