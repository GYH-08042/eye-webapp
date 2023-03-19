<template>
   <div class="logout">
      <van-button round type="info" block color="linear-gradient(to right, #ff6034, #ee0a24)"
         @click="logout">退出登录</van-button>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Dialog } from 'vant'
export default {
   data() {
      return {
      }
   },
   computed: {
   },
   methods: {
      ...mapActions('user', ['getLogout']),
      logout() {
         Dialog.confirm({ message: '确认退出登录？' }).then(() => {
            console.log('正在退出---')
            this.getLogout()
         }).catch(() => { })

      }
   }


}
</script>

<style scope>
.logout {
   padding: .2667rem 0;
}
</style>
