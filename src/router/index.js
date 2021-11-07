import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../layout'


/*
 *角色  role
 *超级管理员       10001
 */
export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
    path: '/',
    redirect: '/competition',
    name: 'index',
    hidden: true
  },
  {
    path: '/competition',
    component: Layout,
    name: 'competition',
    redirect: '/competition/rules',
    meta: {
      title: '竞赛',
      roles: [10001,9002,9003]
    },
    children: [{
      path: '/competition/rules',
      component: () => import('@/views/competition/rules'),
      name: 'rules',
      meta: {
        title: '评分标准',
      }
    }, {
      path: '/competition/createRule',
      component: () => import('@/views/competition/rules/createRule'),
      name: 'createRule',
      hidden: true
    }, {
      path: '/competition/editRule/:id',
      component: () => import('@/views/competition/rules/createRule'),
      name: 'editRule',
      hidden: true
    }, {
      path: '/competition/index',
      component: () => import('@/views/competition/create'),
      name: 'createCompetion',
      meta: {
        title: '竞赛管理',
      }
    }, {
      path: '/competition/create',
      component: () => import('@/views/competition/create/createCompetion'),
      name: 'createCompetition',
      hidden: true
    }, {
      path: '/competition/edit/:id',
      component: () => import('@/views/competition/create/createCompetion'),
      name: 'editCompetition',
      hidden: true
    }]
  },
  {
    path: '/account',
    component: Layout,
    name: 'account',
    redirect: '/account/participant',
    meta: {
      title: '人员管理',
      roles: [10001,9002,9003]
    },
    children: [{
      path: '/account/participant',
      component: () => import('@/views/account/participant'),
      name: 'participant',
      meta: {
        title: '答辩选手',
      }
    },{
      path: '/account/participant/edit/:id',
      component: () => import('@/views/account/participant/edit'),
      name: 'editParticipant',
      hidden: true,
      meta: {
        title: '编辑选手信息',
      }
    }, {
      path: '/account/reviewer',
      component: () => import('@/views/account/reviewer'),
      name: 'reviewer',
      meta: {
        title: '评委信息',
      }
    }, {
      path: '/account/assign',
      component: () => import('@/views/account/reviewer/assign'),
      name: 'reviewer',
      meta: {
        title: '指派管理',
      }
    }, {
      path: '/account/manager',
      component: () => import('@/views/account/manager'),
      name: 'manager',
      meta: {
        title: '管理员信息',
      }
    }, {
      path: '/manager/create',
      component: () => import('@/views/account/manager/create'),
      name: 'createManager',
      hidden: true
    }, {
      path: '/manager/edit/:userId',
      component: () => import('@/views/account/manager/create'),
      name: 'editManager',
      hidden: true
    }]
  }, {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]