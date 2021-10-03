import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../layout'


/*
 *角色  role
 *超级管理员       0
 *管理员（全国）   4
 *省级管理员       1
 *院管理员         2
 *教师             3
 */
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // {
  //   path: '/question',
  //   component: Layout,
  //   redirect: '/question/questionBank',
  //   name: 'question',
  //   meta: {
  //     title: '题库管理',
  //     icon: 'question-manager',
  //     roles: [0, 1, 2, 4]
  //   },
  //   children: [{
  //     path: 'questionBank',
  //     component: () => import('@/views/questionManager/questionBank'),
  //     name: 'questionBank',
  //     meta: {
  //       title: '试题库',
  //       keepAlive: true
  //     }
  //   }]
  // },
]
