<template>
  <div class="registryPage">
    <LoginTitle :title="'注册'"></LoginTitle>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
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
    };
  },
  activated() {
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('user', ['getRegistry']),
    async onSubmit(values) {
      console.log('submit', values);
      await this.getRegistry(Object.values(values))
    },
  },
  components: { LoginTitle }
}
</script>

<style></style>
