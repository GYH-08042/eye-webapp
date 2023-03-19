<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  </van-pull-refresh>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  }
}
</script>

<style>

</style>
