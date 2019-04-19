import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        name:"login-page",
        component:require('@/pages/LoginPage').default
    },
    {
        path: '/',
        name:"main-page",
        component:require('@/pages/MainPage').default,
        children: [{
			path: '/home',
			component: require('@/pages/HomePage').default,
			meta: [],
		},{
            path: '/visitor',
			component: require('@/pages/VisitorPage').default,
			meta: [],
        }]
    },
    // {
    //   path: '*',
    //   redirect: '/login'
    // }
  ]
})
