import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/login')
}, {
    path: '/',
    component: () =>
        import ('@/views/layout'),
    children: [{
        path: '', // 为空，是默认子路由，只能有一个
        name: 'home',
        component: () =>
            import ('@/views/home')
    }, {
        path: '/qa',
        name: 'qa',
        component: () =>
            import ('@/views/qa')
    }, {
        path: '/video',
        name: 'video',
        component: () =>
            import ('@/views/video')
    }, {
        path: '/my',
        name: 'my',
        component: () =>
            import ('@/views/my')
    }]
}, {
    path: '/search',
    name: 'search',
    component: () =>
        import ('@/views/search')
}, {
    path: '/article/:articleId',
    name: 'article',
    component: () =>
        import ('@/views/article')
}, {
    path: '/user/profile',
    name: 'user-profile',
    component: () =>
        import ('@/views/user-profile')
}]

const router = new VueRouter({
    routes
})

export default router