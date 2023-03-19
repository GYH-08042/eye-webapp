<template>
  <div id="searchPage">
    <van-nav-bar :title="`搜索 '${this.$route.query.rec}' 结果`" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-empty v-show="!searchResult?.length" description="啊哦，暂无结果" image="search" />
      <van-list v-show="searchResult?.length" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
        class="recommend-goods" :style="{ 'height': `${count * 9}rem` }">
        <li v-for="(item, index) in searchResult.slice(0, 2 * count)" :key="item.goodsId" class="detail"
          :style="{ 'order': index % 2 == 0 ? 1 : 2 }" @click="toDetail(item)">
          <a href="javascript:;">
            <img :src="`http://192.168.1.3:28019${item.goodsCoverImg}`" alt="" />
            <div class="introduction" v-text="item.goodsName"> </div>
            <div class="keywords" v-text="item.tag"></div>
            <div class="feature">
              <span class="ziying" v-show="item.ziying"></span>
              <span class="baoyou" v-show="item.baoyou" v-text="'包邮'"></span>
            </div>
            <div class="price">
              <div class="now">
                <span>￥{{ parseInt(item.sellingPrice) }}.</span>
                <span>{{ item.sellingPrice - parseInt(item.sellingPrice) }}</span>
              </div>
            </div>
            <img src="@/assets/home-goods/addCart-42.png" alt="" @click.stop="addCart(item)" />
          </a>
        </li>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      loading: false,//触底加载的状态
      isLoading: false,//下拉刷新的状态
      count: 1,//刷新计数，用于判断是否加载完毕
      finished: false//现有数据是否已全部展示
    }
  },
  computed: {
    ...mapState('home', ['newGoodses']),
    ...mapState('goods', ['searchResult'])
  },
  methods: {
    ...mapActions('cart', ['getAddCart']),
    //触底加载
    onLoad() {
      setTimeout(() => {
        if (this.searchResult.length / 2 <= this.count) {//如果数据库的数据已经读完了就修改为已完成的状态
          this.finished = true
        } else {
          this.count++;//数据库还有数据的话就让homePage的count加一，从而多一行商品渲染
        }
        this.loading = false;//渲染完关闭加载状态
      }, 1000)
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
      this.isLoading = true;
      this.count = 1;//初始化
      this.finished = false;//初始化
    },
    //跳转详情页面
    toDetail(item) {
      this.$router.push({
        name: 'DetailPage',
        params: { id: item.goodsId }
      })
      this.$router.go(0)
    },
    //加入购物车
    addCart(item) {
      this.getAddCart({ goodsCount: 1, goodsId: item.goodsId })
    }
  }
}
</script>

<style lang="scss" scoped>
#searchPage {
  .recommend-goods {
    width: 8.9333rem;
    padding: .1333rem .5333rem 2rem;
    display: flex;
    flex-flow: column wrap; //瀑布式布局，通过控制子项的order达到横向排列的效果
    background-color: #f6f6f6;

    li {
      box-sizing: border-box;
      list-style-type: none;
      width: 4.4rem;
      border-radius: .4rem;
      margin-bottom: .48rem;
      overflow: hidden;

      &.detail {
        background-color: #fff;

        a {
          display: block;
          position: relative;
          width: 100%;

          //商品图片
          img:nth-of-type(1) {

            width: 100%;
          }

          //商品描述
          .introduction {
            box-sizing: border-box;
            width: 100%;
            height: 1.4rem;
            margin-top: .2rem;
            padding: 0 .4rem;
            font-size: .4rem;
            color: #222;
            line-height: .72rem;
            //只显示两行，用省略号显示
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          //商品关键词
          .keywords {
            padding: 0 .4rem;
            line-height: .72rem;
            font-size: .3rem;
            color: #f50;
          }

          //是否自营、包邮、可领券   
          .feature {

            height: .56rem;
            padding: 0 .4rem;
            line-height: .56rem;

            span {
              display: inline-block;
              margin-right: .2rem;
            }

            .ziying {
              display: inline-block;
              width: .8rem;
              height: .5rem;
              background: url(@/assets/home-goods/ziying.png) no-repeat;
              background-size: 100%;
              vertical-align: middle;
            }

            .lingquan,
            .baoyou {
              width: fit-content;
              padding: 0 .1rem;
              color: #f50;
              border-radius: .12rem;
              border: solid .04rem #f50;
              font-size: .3rem;
              text-align: center;
              line-height: .4rem;
            }
          }

          //价格显示样式
          .price {
            padding: 0 .4rem;

            div {
              display: inline-block;
            }

            .now {
              height: .6rem;
              line-height: .6rem;
              color: #FF3300;
              margin-bottom: .2rem;

              //整数部分
              span:first-child {

                font-size: .6rem;
              }

              //小数部分
              span:last-child {
                font-size: .4rem;
                color: inherit;
              }
            }
          }

          //图标“抢”
          img:nth-of-type(2) {
            position: absolute;
            right: .4rem;
            bottom: .2rem;
            width: .6rem;
            height: .6rem;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
#searchPage {
  position: relative;

  //设置下拉刷新到底的文字提示位置
  .van-list__loading,
  .van-list__finished-text {
    position: absolute;
    bottom: 2rem;
    width: 8.9333rem;
  }

  //设置empty背景色透明
  .van-empty {
    background-color: transparent;
  }
}
</style>
