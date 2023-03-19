<template>
  <div id="homePage" ref="homePage">
    <SkipToApp text="点击跳转APP" buttonText="立即打开" buttonColor="red" :ifSkipShow="ifSkipShow"><template #icon><img
          src="@/assets/logo.png" alt=""></template></SkipToApp>
    <HomeSearch :sticky="true"></HomeSearch>
    <van-pull-refresh v-model="isLoading" style="min-height: 100vh" @refresh="onRefresh">
      <SwipeImg></SwipeImg>
      <SortGrid></SortGrid>
      <SeckillBox></SeckillBox>
      <HomeGoods :count="count" :finished="finished" @onload="count++" @listFinished="finished = true"></HomeGoods>
    </van-pull-refresh>
    <JdTabbar></JdTabbar>
    <BackTop></BackTop>
  </div>
</template>

<script>
import HomeSearch from '@/components/HomeSearch.vue';
import JdTabbar from '@/components/JdTabbar.vue'
import SkipToApp from '@/components/SkipToApp.vue'
import SwipeImg from '@/components/SwipeImg.vue';
import SortGrid from '@/components/SortGrid.vue';
import SeckillBox from '@/components/SeckillBox.vue';
import HomeGoods from '@/components/HomeGoods.vue';
import BackTop from '@/components/BackTop.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'HomePage',
  data() {
    return {
      isLoading: false,
      count: 1,
      finished: false,
      scrollMark: 0//记录滚动条位置
    }
  },
  props: {
    ifSkipShow: { Boolean, default: true }
  },
  computed: {
    ...mapState('home', ['carousels']),
  },
  mounted() {
    //如果数据库还没有首页数据则调接口
    if (this.carousels.length == 0) {
      this.getHomeInfo()
    }
  },
  methods: {
    ...mapActions('home', ['getHomeInfo']),
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
      this.isLoading = true;
      this.getHomeInfo();//获取最新首页配置数据
      this.count = 1;//初始化HomeGoods
      this.finished = false;//初始化HomeGoods
    },
  },
  components: { JdTabbar, SkipToApp, HomeSearch, SwipeImg, SortGrid, SeckillBox, HomeGoods, BackTop },
  beforeRouteLeave(to, from, next) {//记录休眠时滚动条位置
    this.scrollMark = this.$refs.homePage.scrollTop
    console.log('homePage休眠---', this.scrollMark)
    next()
  },
  activated() {//激活时复刻滚动条位置
    this.$refs.homePage.scrollTop = this.scrollMark
    console.log('homePage激活---', this.$refs.homePage.scrollTop)
  }
}
</script>
<style lang="scss">
#homePage {
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0
  }

}
</style>
