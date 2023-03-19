import Vue from 'vue'
//导入vuex并注册
import vuex from 'vuex'
Vue.use(vuex)
// 导入子数据
import home from './modules/home/home.js'
import goods from './modules/goods/goods.js'
import cart from './modules/cart/cart.js'
import user from './modules/user/user.js'
import order from './modules/order/order.js'


const store = new vuex.Store({
  modules: {
    home,
    goods,
    cart,
    user,
    order
  }
})

export default store