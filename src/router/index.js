import Vue from 'vue'
import VueRouter from 'vue-router'
// 4.导入 ../components/Login.vue 文件
import Login from '../components/Login.vue'
// 导入 ../components/Home.vue 文件
import Home from '../components/Home.vue'
// 导入 ../components/Welcome.vue
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

// 2. 删除路由中原有文件
const routes = [
    // 7.重定向到 /login
    { path: '/', redirect: '/login' },
    // 5.新增Login路由规则
    { path: '/login', component: Login },
    // 新增Home路由规则 
    {
        path: '/home',
        component: Home,
        // 重定向到Welcome
        redirect: '/welcome',
        // 新增Home子路由Welcome
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    // next() 放行  next('/login') 强制跳转
    if (to.path === '/login') return next();
    // 获取 token 
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})


export default router