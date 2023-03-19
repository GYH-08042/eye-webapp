//导入Vue
import Vue from 'vue'
//导入vue-router并注册
import vueRouter from 'vue-router'
Vue.use(vueRouter)

//导入首页、分类、购物车和个人中心并注册
import HomePage from './pages/home/homePage.vue'
import CategoryPage from './pages/category/categoryPage.vue'
import CartPage from './pages/cart/cartPage.vue'
import UserPage from './pages/user/userPage.vue'
import SearchPage from './pages/search/searchPage.vue'
import LoginPage from './pages/login/loginPage.vue'
import RegistryPage from './pages/registry/registryPage.vue'
import AddressCard from './pages/user/AddressCard.vue'
import OrderCard from './pages/user/OrderCard.vue'
import DetailPage from './pages/detail/detailPage.vue'
// const HomePage = () => import('./pages/home/homePage.vue')//用路由懒加载的方式引入
// const CategoryPage = () => import('./pages/category/categoryPage.vue')//用路由懒加载的方式引入
// const CartPage = () => import('./pages/category/cartPage.vue')//用路由懒加载的方式引入
// const UserPage = () => import('./pages/category/userPage.vue')//用路由懒加载的方式引入
// const SearchPage = () => import('./pages/category/searchPage.vue')//用路由懒加载的方式引入
// const LoginPage = () => import('./pages/category/loginPage.vue')//用路由懒加载的方式引入
// const RegistryPage = () => import('./pages/category/registryPage.vue')//用路由懒加载的方式引入
// const AddressCard = () => import('./pages/category/AddressCard.vue')//用路由懒加载的方式引入
// const OrderCard = () => import('./pages/category/OrderCard.vue')//用路由懒加载的方式引入
// const DetailPage = () => import('./pages/category/detailPage.vue')//用路由懒加载的方式引入
Vue.component(HomePage)
Vue.component(CategoryPage)
Vue.component(CartPage)
Vue.component(UserPage)
Vue.component(LoginPage)
Vue.component(DetailPage)
//导入仓储
import store from './store/index.js'

//创建路由系统
const router = new vueRouter({
  mode: 'hash',
  routes: [
    //首页
    { path: '/home', components: { mainPage: HomePage }, alias: '/', meta: { text: '首页', id: '1' }, name: 'HomePage' },
    //分类页
    { path: '/category', components: { mainPage: CategoryPage }, meta: { text: '分类', id: '2' }, name: 'CategoryPage' },
    //购物车页
    { path: '/cart', components: { mainPage: CartPage }, meta: { text: '购物车', id: '3' }, name: 'CartPage' },
    //用户页
    {
      path: '/user', components: { mainPage: UserPage }, meta: { text: '我的', id: '4' }, name: 'UserPage', children: [
        { path: '/user/address', components: { detailCard: AddressCard } },
        { path: '/user/order', components: { detailCard: OrderCard } }
      ]
    },
    //搜索页
    { path: '/search', components: { mainPage: SearchPage }, meta: { text: '搜索', id: '5' }, name: 'SearchPage' },
    //登录页
    { path: '/login', components: { mainPage: LoginPage }, meta: { text: '登录', id: '6' }, name: 'LoginPage' },
    //注册页
    { path: '/registry', components: { mainPage: RegistryPage }, meta: { text: '注册', id: '7' }, name: 'RegistryPage' },
    //详情页
    { path: '/goods/:id', components: { mainPage: DetailPage }, meta: { text: '详情', id: '8' }, name: 'DetailPage' },
    //重定向
    { path: '/*', redirect: '/' }
  ],
  // scrollBehavior(to, from, savedPosition) {//尝试滚动行为
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/cart' || to.path == '/user' || to.path == '/category' || to.path == '/search' || /^good/.test(to.path.slice(1))) {//未登录不得访问搜索页、详情页、购物车及个人中心
    if (localStorage.getItem('token')) {//如果本地存储中存在token则认为已登录
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
  if (to.path == '/login') {//如果已经登录不能访问登录页
    if (localStorage.getItem('token')) {
      next()
    }
  }
  if (to.path == '/search') {//到搜索页开始调接口
    store.dispatch('goods/getSearchResult', { keyword: to.query.rec })
    next()
  }
  if (/^goods/.test(to.path.slice(1))) {//到商品详情页开始调接口
    store.dispatch('goods/getGoodsDetail', to.params.id)
    store.dispatch('cart/getCartList')//商品详情中会用到购物车数量，所以也要在这里调接口
    next()
  }
})
//导出路由
export default router