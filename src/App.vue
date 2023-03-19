<template>
  <div id="app">
    <keep-alive :include="['HomePage', 'CategoryPage', 'CartPage']">
      <router-view name="mainPage" :ifSkipShow="ifSkipShow" />
    </keep-alive>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
//导出App
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      ifSkipShow: sessionStorage.getItem('ifSkipShow') == "false" ? false : true,
    }
  },
  watch: {
    //跳转APP被关了一次之后，刷新也不能出来，除非关闭窗口重新打开
    ifSkipShow() {
      sessionStorage.setItem('ifSkipShow', false)
    }
  },
  computed: {

  },
  methods: {//从Vuex映射获取用户信息函数
    ...mapActions('user', ['getUserInfo'])
  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>
