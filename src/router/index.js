import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import ('views/detail/Detail')

//1、安装插件
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home' //重定向
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  // {
  //   path:'/detail/:iid',
  //   name:'detail',
  //   component: Detail
  // }
  {
    path:'/detail',
    component:Detail
  }
]

//2、创建 router
const router = new VueRouter({
  routes,
  mode: 'history'
})

//解决导航栏中的 vue-router 重复点击路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router;