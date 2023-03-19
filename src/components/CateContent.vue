<template>
  <div id="CateContent" ref="CateContent" @scroll="scroll">
    <van-grid column-num="2" v-show="refreshTurning">
      <van-grid-item v-for="item in cateResult[this.$route.query.id]" :key="item.goodsId"
        :icon="`http://192.168.1.3:28019${item.goodsCoverImg}`" :text="`${item.goodsName} \n${item.sellingPrice} `"
        @click="toDetail(item)" />
    </van-grid>
    <van-empty v-show="!cateResult[this.$route.query.id]?.length" description="啊哦，暂无该类商品" image="search" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      scrollMark: 0,//记录滚动条位置
    }
  },
  watch: {
  },
  computed: {
    ...mapState('goods', ['cateResult', 'refreshTurning']),
  },
  methods: {
    //跳转详情页面
    toDetail(item) {
      this.$router.push(`/goods/${item.goodsId}`)
    },
    scroll() {
      this.scrollMark = this.$refs.CateContent.scrollTop;
      console.log('content滚动了---', this.scrollMark)
    }
  },
  activated() {
    // document.querySelector('#CateContent').scrollTop = this.$parent.scrollMark2
    setTimeout(() => {
      this.$refs.CateContent.scrollTop = this.$parent.scrollMark2
      console.log('content激活---', this.$refs.CateContent.scrollTop, this.$parent.scrollMark2)
    }, 100)
  }
}
</script>

<style lang="scss">
#CateContent {
  width: 7.7333rem;
  height: 16.5867rem;
  position: absolute;
  box-sizing: border-box;
  right: 0;
  top: 0;
  border: 0;
  background-color: #fff;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  // 宫格组件
  .van-grid {
    margin-bottom: 1.5rem;

    // 图标
    .van-icon {
      font-size: 3rem;
    }

    // 文字
    .van-grid-item {
      .van-grid-item__text {
        font-size: .2rem;
      }
    }

  }
}
</style>
