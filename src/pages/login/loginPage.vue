<template>
  <div class="loginPage">
    <LoginTitle title="登录"></LoginTitle>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/registry" class="link">还没有账号？点击注册</router-link>
  </div>
</template>

<script>
import LoginTitle from '@/components/LoginTitle.vue';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  activated() {
  },
  watch: {
  },
  created() {
  },
  computed: {

  },
  methods: {
    ...mapActions('user', ['getLogin', 'getUserInfo']),
    async onSubmit(values) {
      await this.getLogin(Object.values(values))//调用user数据库映射过来的登录接口函数
    }
  },
  components: { LoginTitle }


}
</script>

<style scoped>
.loginPage .link {
  display: inline-block;
  width: 100%;
  height: .6667rem;
  line-height: .6667rem;
  font-size: .2133rem;
  text-align: center;
}
</style>