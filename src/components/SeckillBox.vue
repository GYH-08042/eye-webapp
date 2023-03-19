<template>
  <div class="sk-box">
    <div class="sk">
      <div class="sk-h1">
        <div class="sk-h1-left">
          <span>{{ '新品秒杀' }}</span>
          <span class="sk-h1-rounds">12</span>
          <van-count-down :time="time">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
        <!-- <div class="sk-h1-right">
          {{ '查看更多' }}
        </div> -->
      </div>
      <div class="sk-goods">
        <ul class="sk-goods-scroll">
          <li v-for="item in hotGoodses" :key="item.goodsId" class="sk-goods-show" v-login @click="$router.push({
            name: 'DetailPage', params: { id: item.goodsId }
          })">
            <img :src="`http://192.168.1.3:28019${item.goodsCoverImg}`" />
            <span v-text="`￥${item.sellingPrice.toFixed(2)}`"></span>
          </li>
          <!-- <li v-text="'查看全部'" class="sk-goods-more"></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState('home', ['hotGoodses'])
  },
  props: {
    time: {
      type: Number,
      default: 30 * 60 * 60 * 1000
    },
    goods: {
      type: Array,
      default: () => [
        { id: 1, img: require('@/assets/seckill/goods/1.png'), price: '52.00' },
        { id: 2, img: require('@/assets/seckill/goods/2.png'), price: '152.00' },
        { id: 3, img: require('@/assets/seckill/goods/3.png'), price: '52.00' },
        { id: 4, img: require('@/assets/seckill/goods/4.png'), price: '52.00' },
        { id: 5, img: require('@/assets/seckill/goods/5.png'), price: '52.00' },
        { id: 6, img: require('@/assets/seckill/goods/6.png'), price: '83.00' },
        { id: 7, img: require('@/assets/seckill/goods/7.png'), price: '52.00' },
        { id: 8, img: require('@/assets/seckill/goods/8.png'), price: '49.00' },
        { id: 9, img: require('@/assets/seckill/goods/9.png'), price: '52.00' },
        { id: 10, img: require('@/assets/seckill/goods/10.png'), price: '52.00' },
        { id: 11, img: require('@/assets/seckill/goods/11.png'), price: '52.00' },
        { id: 12, img: require('@/assets/seckill/goods/12.png'), price: '97.00' },
        { id: 13, img: require('@/assets/seckill/goods/13.png'), price: '88.00' },
        { id: 14, img: require('@/assets/seckill/goods/14.png'), price: '52.00' },
        { id: 15, img: require('@/assets/seckill/goods/15.png'), price: '52.00' },
        { id: 16, img: require('@/assets/seckill/goods/16.png'), price: '52.00' },
        { id: 17, img: require('@/assets/seckill/goods/17.png'), price: '52.00' },
        { id: 18, img: require('@/assets/seckill/goods/18.png'), price: '52.00' },
        { id: 19, img: require('@/assets/seckill/goods/19.png'), price: '52.00' },
        { id: 20, img: require('@/assets/seckill/goods/20.png'), price: '188.00' },
        { id: 21, img: require('@/assets/seckill/goods/21.png'), price: '1235.00' },
        { id: 22, img: require('@/assets/seckill/goods/22.png'), price: '52.00' },
        { id: 23, img: require('@/assets/seckill/goods/23.png'), price: '52.00' },
        { id: 24, img: require('@/assets/seckill/goods/24.png'), price: '52.00' },
        { id: 25, img: require('@/assets/seckill/goods/25.png'), price: '52.00' },
        { id: 26, img: require('@/assets/seckill/goods/26.png'), price: '52.00' },



      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/* 控制距上下左右的距离 */
.sk-box {
  box-sizing: border-box;
  width: 100%;
  background-color: #f6f6f6;
  padding: .0667rem .5067rem;
  display: flex;
}

/* 控制展示框大小、边框样式 */
.sk {
  flex: 1;
  height: 3.5rem;
  border-radius: .1333rem;
  background-color: #fff;
  box-shadow: 0 0 .0667rem gray;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}

/* 表头整体宽高 */
.sk-h1 {
  width: 100%;
  height: .8rem;
  display: flex;
}

/* 表头靠左的元素样式 */
.sk-h1-left {
  flex: 1;
  height: .8rem;
  line-height: .4667rem;
  margin-left: .0667rem;
  font-size: .2133rem;
  overflow: hidden;
  background: url(@/assets/seckill/seckill-bg.png) no-repeat;
  background-size: 150% 100%;
  display: flex;
  align-items: center;
}

/* 京东秒杀字样大小 */
.sk-h1-left>span:first-child {
  font-size: .3rem;
  margin-left: .1333rem;
}

/* 场次字样大小 */
.sk-h1-rounds {
  width: 1.5rem;
  color: #FF2727;
  font-size: .3rem;
  text-align: center;
  margin-right: .1333rem
}

/* 场次icon */
.sk-h1-rounds::after {
  display: inline-block;
  vertical-align: middle;
  width: .64rem;
  height: .8rem;
  content: '';
  background: url(@/assets/seckill/seckill-time.png) no-repeat center;
  background-size: 90%;
}

/* 表头靠右的元素样式 */
.sk-h1-right {
  float: right;
  margin-right: .1333rem;
  line-height: .8rem;
  color: #FC3E2C;
  font-size: .3rem;
}

.sk-h1-right::after {
  content: '';
  display: inline-block;
  width: .4rem;
  height: .4rem;
  margin-bottom: .0533rem;
  background: url(@/assets/seckill/seckill-icon.png) no-repeat center;
  background-size: .3rem .3rem;
  vertical-align: middle;
}

/* vantUI倒计时组件样式 */
.colon {
  display: inline-block;
  margin: 0 .0267rem;
  color: #ee0a24;
}

.block {
  box-sizing: border-box;
  display: inline-block;
  width: .4rem;
  color: #fff;
  font-size: .16rem;
  text-align: center;
  background-image: linear-gradient(-140deg, #ff6152, #fa2c19);
  border-radius: .1rem
}

/* 商品滑动展示 */
.sk-goods {
  overflow-y: hidden;
  overflow-x: scroll;
  width: 8.5rem;
  flex: 1;
  margin: 0 auto;

  &::-webkit-scrollbar {
    height: 0;
  }

  .sk-goods-scroll {
    margin: .3rem 0;
    display: flex;
    height: 2rem;

    .sk-goods-show {
      width: 1.53rem;
      height: 2rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-right: .35rem;

      img {
        width: 1.52rem;
      }

      span {
        font-size: .16rem;
        line-height: .7rem;
        color: #ee0a24;
      }
    }

    .sk-goods-more {
      margin-left: .5rem;
      width: .16rem;
      height: 2rem;
      font-size: .16rem;

      &::before {
        content: '';
        display: inline-block;
        width: .4rem;
        height: .4rem;
        margin-bottom: .0533rem;
        background: url(@/assets/seckill/seckill-icon.png) no-repeat center;
        background-size: .3rem .3rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
