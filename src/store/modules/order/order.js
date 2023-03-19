//引入生成订单接口
import { fetchSaveOrder } from "@/utils/api"
//引入获取订单列表接口
import { fetchOrderList } from "@/utils/api"
//引入获取订单详情接口
import { fetchOrderDetail } from "@/utils/api"
//引入取消订单接口
import { fetchCancelOrder } from "@/utils/api"
//引入模拟支付成功接口
import { fetchPaySuccess } from "@/utils/api"
//引入确认收货接口
import { fetchOrderFinished } from "@/utils/api"
import { Notify } from "vant"
export default {
  namespaced: true,
  state: {
    orderList: [],//订单列表
    orderDetail: {},//订单详情
    orderNeedPay: [],//订单筛选列表（待支付）
    orderNeedConfirm: [],//订单筛选列表（待商家确认）
    orderNeedDispatch: [],//订单筛选列表（待发货）
    orderDispatching: [],//订单筛选列表（已发货）
    orderFinished: [],//订单筛选列表（交易成功）
    orderClosed: []//订单筛选列表（已关闭）
  },
  getters: {

  },
  mutations: {
    //存储订单列表数据
    setOrderList(state, val) {
      state.orderNeedPay = [];
      state.orderNeedConfirm = [];
      state.orderNeedDispatch = [];
      state.orderDispatching = [];
      state.orderFinished = [];
      state.orderClosed = [];
      val.list.forEach(item => {//完成订单列表的筛选存储
        switch (item.orderStatus) {
          case 0: state.orderNeedPay.push(item); break;
          case 1: state.orderNeedConfirm.push(item); break;
          case 2: state.orderNeedDispatch.push(item); break;
          case 3: state.orderDispatching.push(item); break;
          case 4: state.orderFinished.push(item); break;
          case -1: state.orderClosed.push(item);
        }
      })
      state.orderList = [...state.orderNeedPay, ...state.orderNeedConfirm, ...state.orderNeedDispatch, ...state.orderDispatching, ...state.orderFinished, ...state.orderClosed]
    },
    //存储订单详情数据
    setOrderDetail(state, val) {
      state.orderDetail = val
    }
  },
  actions: {
    //生成订单接口
    getSaveOrder(store, value) {
      return fetchSaveOrder(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('生成订单成功---')
            Notify({ type: 'success', message: '提交成功' })
            store.dispatch('getOrderList')//提交后立刻调取订单列表
            store.dispatch('cart/getCartList', '', { root: true })//提交订单后刷新购物车

          } else {
            console.log('生成订单失败---', res)
          }
        } else {
          console.log('请求生成订单失败---', res)
        }
      })
    },
    //获取订单列表接口
    getOrderList(store, value) {
      return fetchOrderList(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取订单列表成功---')
            store.commit('setOrderList', res.data.data)//存储订单列表数据
          } else {
            console.log('获取订单列表失败---', res)
          }
        } else {
          console.log('请求获取订单列表失败---', res)
        }
      })
    },
    //获取订单详情接口
    getOrderDetail(store, orderNo) {
      return fetchOrderDetail(orderNo).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取订单详情成功---')
            store.commit('setOrderDetail', res.data.data)//存储订单详情
          } else {
            console.log('获取订单详情失败---', res)
          }
        } else {
          console.log('请求获取订单详情失败---', res)
        }
      })
    },
    //取消订单接口
    getCancelOrder(store, orderNo) {
      return fetchCancelOrder(orderNo).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('取消订单成功---')
            Notify({ type: 'success', message: '取消订单成功' });
            store.dispatch('getOrderList')//取消后更新订单列表（记录订单状态）
          } else {
            Notify({ type: 'warning', message: '取消订单失败' });
            console.log('取消订单失败---', res)
          }
        } else {
          console.log('请求取消订单失败---', res)
        }
      })
    },
    //确认收货接口
    getOrderFinished(store, orderNo) {
      return fetchOrderFinished(orderNo).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('确认收货成功---')
            Notify({ type: 'success', message: '确认收货成功' });
            store.dispatch('getOrderList')//确认后更新订单列表（记录订单状态）
            store.dispatch('getOrderDetail', orderNo)//确认后更新详情页数据
          } else {
            console.log('确认收货失败---', res)
          }
        } else {
          console.log('请求确认收货失败---', res)
        }
      })
    },
    //模拟支付成功接口
    getPaySuccess(store, value) {
      return fetchPaySuccess(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('模拟支付成功---')
            Notify({ type: 'success', message: '支付成功' });
            store.dispatch('getOrderList')//模拟后更新订单列表（记录订单状态）
            store.dispatch('getOrderDetail', value.orderId)//更新订单详情状态到已支付
          } else {
            Notify({ type: 'warning', message: '支付失败' });
            console.log('模拟支付失败---', res)
          }
        } else {
          console.log('请求模拟支付失败---', res)
        }
      })
    }

  }
}