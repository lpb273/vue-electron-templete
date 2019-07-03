import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/components/common/index').default
    },
    {
      path: '/second',
      name: 'second',
      component: require('@/components/common/second').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
