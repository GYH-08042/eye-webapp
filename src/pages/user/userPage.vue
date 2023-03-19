<template>
  <div id="userPage">
    <UserTitle :title="'个人中心'"></UserTitle>
    <UserCard></UserCard>
    <van-overlay :show="$route.path == '/user/order' || $route.path == '/user/address'" @click="$router.replace('/user')"
      :lock-scroll="false">
      <div class="wrapper" @click.stop>
        <router-view name="detailCard"></router-view>
      </div>
    </van-overlay>
    <JdTabbar></JdTabbar>
    <LogoutButton></LogoutButton>
  </div>
</template>

<script>
import JdTabbar from '@/components/JdTabbar.vue';
import UserTitle from '@/components/UserTitle.vue';
import UserCard from '@/components/UserCard.vue';
import LogoutButton from '@/components/LogoutButton.vue'
export default {
  data() {
    return {
      show: false//控制遮罩层的显示与隐藏，通过子组件UserCard中的点击事件触发显示，触发边缘隐藏
    }
  },
  methods: {
  },
  mounted() {
  }
  ,
  components: { JdTabbar, UserTitle, UserCard, LogoutButton }
}
</script>
<style lang="scss" scoped>
#userPage {
  background-color: brown;
  height: 100%;
  position: relative;

  // 遮罩层内容区域设置
  .wrapper {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: .5rem;
    overflow: hidden;
  }
}
</style>
