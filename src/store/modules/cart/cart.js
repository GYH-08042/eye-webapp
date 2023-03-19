//引入加入购物车接口
import { fetchAddCart } from "@/utils/api"
//引入获取购物车列表接口
import { fetchCartList } from "@/utils/api"
//引入修改购物项列表接口
import { fetchEditCart } from "@/utils/api"
//引入删除购物车列表接口
import { fetchDeleteCart } from "@/utils/api"
import { Toast } from "vant"
export default {
  namespaced: true,
  state: {
    cartList: [],//购物车列表
  },
  mutations: {
    //存储购物车列表数据
    setCartList(state, val) {
      state.cartList = val
    }
  },
  actions: {
    //添加购物车接口
    getAddCart(store, value) {
      return fetchAddCart(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('添加购物车成功---')
            Toast('添加购物车成功~')
            //为了详情界面购物车徽标数据的显示，加购后立刻更新购物车列表
            store.dispatch('getCartList')
          } else if (res.data.resultCode == 500) {//此时后端反馈已存在，无需重复添加
            if (value.operation == 'add') {
              Toast('您已加购\n去购物车查看吧~')
            }

          } else {
            console.log('添加购物车失败---', res)
          }
        } else {
          console.log('请求添加购物车失败---', res)
        }
      })
    },
    //获取购物车列表接口
    getCartList(store) {
      return fetchCartList().then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取购物车列表成功---')
            store.commit('setCartList', res.data.data)//存储购物车列表数据
          } else {
            console.log('获取购物车列表失败---', res)
          }
        } else {
          console.log('请求获取购物车列表失败---', res)
        }
      })
    },
    //修改购物项接口
    getEditCart(store, value) {
      return fetchEditCart(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改购物项成功---')
            store.dispatch('getCartList')//修改后更新购物车列表
          } else if (res.data.resultCode == 416) {//如果反馈登录失效，则退出登录
            console.log('res.data.message---')
            Toast('登录已超时，请重新登录~')
            store.dispatch('user/getLogout')
          } else {
            console.log('修改购物项失败---', res)
          }
        } else {
          console.log('请求修改购物项失败---', res)
        }
      })
    },
    //删除购物项接口
    getDeleteCart(store, cartId) {
      return fetchDeleteCart(cartId).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('删除购物项成功---')
            store.dispatch('getCartList')//删除后更新购物车列表
          } else {
            console.log('删除购物项失败---', res)
          }
        } else {
          console.log('请求删除购物项失败---', res)
        }
      })
    }

  }
}