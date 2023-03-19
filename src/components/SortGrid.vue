<template>
  <div class="grid">
    <van-swipe :loop="false" lass="my-swipe" indicator-color="#d81e06">
      <van-swipe-item v-for="num in pageCount" :key="num" style="padding-bottom:.5rem">
        <van-grid :column-num="5">
          <van-grid-item v-for="item in gridData.slice(10 * (num - 1), 10 * (num - 1) + 10)" :key="item.id"
            :text="item.text" @click="wait">
            <template #icon><img :src="item.icon" /></template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {

    }
  },
  props: {
    gridData: {
      type: Array,
      default: () => [
        { id: 1, text: '超市', icon: require('@/assets/grid-icon/market.png') },
        { id: 2, text: '数码电器', icon: require('@/assets/grid-icon/digital.png') },
        { id: 3, text: '生鲜', icon: require('@/assets/grid-icon/veg.png') },
        { id: 4, text: '急速到家', icon: require('@/assets/grid-icon/deliver.png') },
        { id: 5, text: '充值缴费', icon: require('@/assets/grid-icon/topup.png') },
        { id: 6, text: '附近好店', icon: require('@/assets/grid-icon/nearby.png') },
        { id: 7, text: '领券', icon: require('@/assets/grid-icon/coupon.png') },
        { id: 8, text: '会员生活', icon: require('@/assets/grid-icon/vip.png') },
        { id: 9, text: '进口好物', icon: require('@/assets/grid-icon/import.png') },
        { id: 10, text: '拍卖', icon: require('@/assets/grid-icon/auction.png') },
        { id: 11, text: '沃尔玛', icon: require('@/assets/grid-icon/womart.png') },
        { id: 12, text: '美妆馆', icon: require('@/assets/grid-icon/makeup.png') },
        { id: 13, text: '旅行', icon: require('@/assets/grid-icon/journey.png') },
        { id: 14, text: '全部', icon: require('@/assets/grid-icon/all.png') }
      ]
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.gridData.length / 10)
    }
  },
  methods: {
    //暂为开通的功能，进行弹窗提示
    wait() {
      Toast('暂未开通，敬请期待！')
    }
  }
}
</script>

<style scoped>
/* 修改背景颜色 */
.grid van-swipe-item {
  background-color: #f6f6f6;
}

/* 修改图标大小 */
.grid img {
  width: 1.12rem;
}

/* 修改字体大小 */
.grid .van-grid-item__text {
  font-size: .16rem;
}
</style>

<style>
/* 修改背景颜色 */
.grid .van-swipe__track,
.grid .van-grid-item__content {
  background-color: #f6f6f6;
}
</style>
