<template>
  <div id="detailPage">
    <van-sticky><van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="$router.back()" /></van-sticky>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for=" (item, index) in goodsCarouselList" :key="index">
          <img v-lazy="`http://192.168.1.3:28019${item}`" class="carousel" />
        </van-swipe-item>
      </van-swipe>
      <h1 v-text="goodsDetail.goodsName" class="goodsName"></h1>
      <h2 v-text="goodsDetail.goodsIntro" class="goodsIntro"></h2>
      <div class="sellingPrice" v-text="`现价：￥${goodsDetail?.sellingPrice?.toFixed(2)}`"></div>
      <div class="originalPrice" v-text="`原价：￥${goodsDetail?.originalPrice?.toFixed(2)}`"></div>
    </van-pull-refresh>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" v-login />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="this.cartList?.length" v-login />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" v-login />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" v-login to="/cart" />
    </van-goods-action>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'DetailPage',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('goods', ['goodsDetail']),
    ...mapState('cart', ['cartList']),
    //轮播图片路径数据处理
    goodsCarouselList() {
      return this.goodsDetail.goodsCarouselList?.map(item => {
        if (item[0] != '/') {
          return item.slice(item.indexOf('/', 7))
        } else {
          return item
        }

      })
    }
  },
  methods: {
    ...mapActions('goods', ['getGoodsDetail']),
    ...mapActions('cart', ['getAddCart']),
    ...mapMutations('goods', ['setGoodsDetail']),
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      this.isLoading = true
      this.$router.go(0)//刷新当前页面，就会重调详情数据接口
    },
    //点击图标
    onClickIcon() {

    },
    //点击加入购物车
    addCart() {
      this.getAddCart({ goodsCount: 1, goodsId: this.$route.params.id, operation: 'add' })
    },
    //点击立即购买
    buyNow() {
      this.getAddCart({ goodsCount: 1, goodsId: this.$route.params.id, operation: 'buy' })
    }
  },
  //路由离开时清空vuex中的商品详情数据，防止打开下一个商品时有数据残留，一闪而过
  beforeRouteLeave(to, from, next) {
    this.setGoodsDetail({})
    next()
  }

}
</script>

<style lang="scss" scoped>
#detailPage {
  .van-pull-refresh {

    //轮播图
    .van-swipe {
      height: 100vw;

      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: gray;


        .carousel {
          width: 100%;
        }
      }
    }

    //商品名
    .goodsName {
      text-indent: .2667rem;
      font-size: .5rem;
    }

    //商品简介
    .goodsIntro {
      text-indent: .2667rem;
      font-size: 0.4rem;
    }

    //现价
    .sellingPrice {
      text-indent: .2667rem;
      color: red;
      font-size: .3rem;
    }

    //原价
    .originalPrice {
      text-indent: .2667rem;
      color: gray;
      font-size: .2rem;
      text-decoration: line-through;
    }


  }
}
</style>
