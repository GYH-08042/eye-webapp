import Vue from 'vue'
import router from '@/router'

//自定义v-login指令，点击后判断用户是否登录，若未登录则跳转登录页面
Vue.directive('login', function (el) {
  el.addEventListener('click', () => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
  })
})