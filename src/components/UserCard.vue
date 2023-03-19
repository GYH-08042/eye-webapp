<template>
  <div class="user-card">
    <van-cell-group inset>
      <van-cell icon='manager-o' title="登录名" :value="loginName" size="large" />
      <van-cell icon='phone-o' title="昵称" :value="nickName" size="large" />
      <van-cell icon='home-o' title="签名" :value="introduceSign" size="large" />
      <van-cell icon='home-o' title="我的收件地址" is-link :label="address" size="large" to="/user/address" />
      <van-cell icon='home-o' title="我的订单" is-link size="large" to="/user/order" />
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
    }
  },
  props: {
  },
  computed: {
    ...mapState('user', ['loginName', 'nickName', 'introduceSign', 'addressInfo', 'defaultAddress', 'addressList']),
    address() {//处理默认地址数据用于展示
      if (this.defaultAddress == '暂无地址，点击添加') {
        return '暂未设置默认地址，点击管理'
      } else if (this.defaultAddress.userName !== undefined) {
        const address = `${this?.defaultAddress?.userName} ${this?.defaultAddress?.userPhone}
      ${this?.defaultAddress?.provinceName}省${this?.defaultAddress?.cityName}市${this?.defaultAddress?.regionName}区${this?.defaultAddress?.detailAddress}`
        return address
      } else {
        return '地址加载中……'
      }

    }
  },
  async mounted() {
    if (!this.loginName) {//如果数据库中有用户信息就不调取了，如果没有用户信息但有token就用token调接口
      console.log('需要调信息接口---', localStorage.getItem('token'))
      if (localStorage.getItem('token')) {
        console.log('用token调信息接口---')
        await this.getUserInfo()//调取Vuex映射过来的获取用户信息接口
        if (!this.defaultAddress.addressId) {//如果购物车页面已经调过地址接口就不进行下一步了
          await this.getDefaultAddress()//调取Vuex映射过来的获取默认地址接口
          await this.getAddressList()//调取Vuex映射过来的获取地址列表接口
        }
      } else {
        console.log('带不上token---')
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo', 'getDefaultAddress', 'getAddressList'])
  }
}
</script>

<style scoped>
.user-card {
  padding: .4rem .0667rem;
}
</style>
