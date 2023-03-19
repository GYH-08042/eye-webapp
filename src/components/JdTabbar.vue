<template>
  <div>
    <van-tabbar active-color="#d81e06" route>
      <van-tabbar-item v-for="(item, index) in router.options.routes.slice(0, 4)" :key="item.meta.id" :to="item.path"
        :dot="!ifLogin && index == 3" replace>
        {{ `${!ifLogin && index == 3 ? '未登录' : item.meta.text}` }}
        <template #icon="{ active }">
          <img :src="require(`@/assets/tabbar-icon/${item.path.slice(1)}${active ? '-on.png' : '.png'}`)" alt="">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
//引入路由信息
import router from '@/router.js'

export default {
  data() {
    return {
      active: 0,
      router
    }
  },
  computed: {
    ifLogin() {//检测登录状态
      if (localStorage.getItem('token')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
