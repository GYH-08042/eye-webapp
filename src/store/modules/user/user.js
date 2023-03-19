//引入获取用户信息接口函数
import { fetchUser } from '@/utils/api.js'
//引入用户登录接口函数
import { fetchLogin } from '@/utils/api.js'
//引入用户注册接口函数
import { fetchRegistry } from '@/utils/api.js'
//引入用户退出登录接口函数
import { fetchLogout } from '@/utils/api.js'
//引入修改个人信息接口函数
import { fetchEditInfo } from '@/utils/api.js'
//引入获取默认地址接口函数
import { fetchDefaultAddress } from '@/utils/api.js'
//引入获取地址列表接口函数
import { fetchAddressList } from '@/utils/api.js'
//引入修改地址接口函数
import { fetchEditAddress } from '@/utils/api.js'
//引入添加地址接口函数
import { fetchAddAddress } from '@/utils/api.js'
//引入删除地址接口函数
import { fetchDeleteAddress } from '@/utils/api.js'
//引入获取某地址详情接口函数
import { fetchAddressDetail } from '@/utils/api.js'
//引入路由
import router from '@/router.js'
//引入弹出框
import { Dialog } from 'vant';
//引入提示框
import { Notify } from 'vant';
//引入密码加密
import md5 from 'js-md5'

const state = {
  loginName: '',
  nickName: '',
  introduceSign: '',
  defaultAddress: {},
  addressList: [],
}

const mutations = {
  //存储用户信息
  setUserInfo(state, { loginName, nickName, introduceSign }) {
    state.loginName = loginName
    state.nickName = nickName
    state.introduceSign = introduceSign
  },
  //存储默认地址
  setDefaultAddress(state, val) {
    state.defaultAddress = val
  },
  //存储地址列表
  setAddressList(state, val) {
    state.addressList = Object.values(val)
  },
}

const actions = {
  //登录接口
  getLogin(store, value) {
    return fetchLogin({ "loginName": value[0], "passwordMd5": md5(value[1]) }).then(res => {//密码用md5加密
      if (res.status == 200) {//请求成功则继续判断登录数据是否匹配
        if (res.data.resultCode == 200 && res.data.message == 'SUCCESS') {//
          console.log('登录成功---')
          Notify({ type: 'success', message: '登陆成功' });
          localStorage.setItem('token', res.data.data)//存储token
          try {
            router.back()//登录好回到上一页
          } catch (err) { router.replace('/') }//如果本身就直接进的login页，再返回也还是login页会报错，这个时候就回到首页去
        } else {//登陆失败提示框
          console.log('登陆失败---', res)
          Dialog.alert({ message: `${res.data.message}\n请重新登录` }).then(() => { router.go(0) })
        }
      }
    }).catch((res) => { console.log('请求登录失败---', res) })
  },
  //注册接口
  getRegistry(store, value) {
    return fetchRegistry({ 'loginName': value[0], 'password': value[1] }).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('注册成功---')
          Notify({ type: 'success', message: '注册成功，请登录！' });
          router.replace('/login')
        } else {//注册失败提示框
          console.log('注册失败---', res)
          Dialog.alert({ message: `${res.data.message}\n请重新注册` }).then(() => { router.go(0) })
        }
      }
    }).catch(res => { console.log('请求注册失败---', res) })
  },
  //获取用户信息接口
  getUserInfo(store, value) {
    return fetchUser(value).then(res => {
      if (res.status == 200) {//请求成功则继续判断登录是否有效
        if (res.data.resultCode == 200 && res.data.message == "SUCCESS") {//登陆有效则存储信息
          console.log('登录有效---')
          store.commit('setUserInfo', res.data.data)
        } else {//登录失效跳转登录页
          console.log('登录已失效---', res)
          Notify({ type: 'success', message: '登录已失效' });
          localStorage.removeItem('token')//清除token
          router.push('/login')
        }
      }
    }).catch((res) => { console.log('请求用户信息失败---', res) })
  },
  //退出登录接口
  getLogout(store, value) {
    return fetchLogout(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('已退出登录---')
          localStorage.removeItem('token')//清除token
          store.commit('setUserInfo', {})//清空用户信息
          router.replace('/')
        }
      }
    }).catch(res => {
      console.log('请求退出失败---', res)
    })
  },
  //修改个人信息接口
  getEditInfo(store, value) {
    return fetchEditInfo({ 'nickName': value[0], 'introduceSign': value[1], 'passwordMd5': md5(value[2]) }).then((res) => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('修改成功---')
          Notify({ type: 'success', message: '修改成功' });
          store.dispatch('getUserInfo')//重新获取新改好的用户信息
        }
      }
    }).catch(res => {
      console.log('请求修改用户信息失败---', res)
    })
  },
  //获取默认地址接口
  getDefaultAddress(store, value) {
    return fetchDefaultAddress(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('获取默认地址成功---')
          if (res.data.data) {//有数据就存起来
            store.commit('setDefaultAddress', res.data.data)
          } else {//没数据弹出警告
            store.commit('setDefaultAddress', '暂无地址，点击添加')
          }
        } else {
          console.log('获取默认地址失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求默认地址失败---', res)
    })
  },
  //获取地址列表接口
  getAddressList(store, value) {
    return fetchAddressList(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('获取地址列表成功---')
          if (res.data.data) {//有数据就存起来
            store.commit('setAddressList', res.data.data)
          } else {//没数据弹出警告
            Notify({ type: 'warning', message: '暂无地址，请添加' });
          }
        } else {
          console.log('获取地址列表失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求地址列表失败---', res)
    })
  },
  //添加地址接口
  getAddAddress(store, value) {
    return fetchAddAddress(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('添加地址成功---')
          store.dispatch('getAddressList')//添加地址后刷新地址列表
          store.dispatch('getDefaultAddress')//添加地址后更新默认地址
        } else {
          console.log('添加地址失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求添加地址失败---', res)
    })
  },
  //修改地址接口
  getEditAddress(store, value) {
    return fetchEditAddress(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('修改地址成功---')
          store.dispatch('getAddressList')//添加地址后刷新地址列表
          store.dispatch('getDefaultAddress')//添加地址后更新默认地址
        } else {
          console.log('修改地址失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求修改地址失败---', res)
    })
  },
  //删除地址接口
  getDeleteAddress(store, id) {
    return fetchDeleteAddress(id).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('删除地址成功---')
          store.dispatch('getAddressList')//删除地址后刷新地址列表
          store.dispatch('getDefaultAddress')//删除地址后更新默认地址
        } else {
          console.log('删除地址失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求删除地址失败---', res)
    })
  },
  //获取地址详情接口(获取详情仅为切换默认地址功能所用，所以顺带就把默认标记给改了)
  getAddressDetail(store, id) {
    return fetchAddressDetail(id).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('获取详情成功---')
          const ndata = res.data.data
          ndata.defaultFlag == '0000' ? ndata.defaultFlag = '0001' : ndata.defaultFlag = '0000'//更改默认标记
          store.dispatch('getEditAddress', ndata)
        } else {
          console.log('获取详情失败---', res)
        }
      }
    }).catch(res => {
      console.log('请求获取详情失败---', res)
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
