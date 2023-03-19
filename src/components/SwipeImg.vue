<template>
  <div class="swipe">
    <div class="swipe-box"></div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#d81e06">
      <van-swipe-item v-for="(item, index) in carousels" :key="index"><img v-lazy="item.carouselUrl"
          @click="$router.push(item.redirectUrl)" /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState('home', ['carousels', 'hotGoodses', 'newGoodses'])
  },
  methods: {
    ...mapActions('home', ['getHomeInfo'])
  }
}
</script>

<style scoped>
.swipe {
  position: relative;
  width: 100%;
  height: 3.7333rem;
  overflow: hidden;
  background-color: #F6F6F6
}

/* 渐变背景设置 */
.swipe .swipe-box {
  position: absolute;
  top: 0;
  left: -25%;
  width: 150%;
  height: 2.5rem;
  background: linear-gradient(0deg, #f1503b, #d81e06 50%);
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%
}

/* 轮播区域占位设置 */
.swipe .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20.0025px;
  line-height: 150px;
  text-align: center;
  background-color: #F6F6F6;
  height: 3.7333rem;
  width: 9.3333rem !important;
  border-radius: .5rem;
  overflow: hidden;
  margin: 0 auto;
}

/* 轮播图大小设置 */
.swipe .my-swipe img {
  width: 100%
}
</style>
