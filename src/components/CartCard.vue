<template>
  <div id="CartCard">
    <van-swipe-cell>
      <van-checkbox :name="item.cartItemId" @click.stop></van-checkbox>
      <van-card :price="item.sellingPrice.toFixed(2)" :title="item.goodsName"
        :thumb="`http://192.168.1.3:28019${item.goodsCoverImg}`" lazy-load @click="backToDetail">
        <template #num>
          <div @click.stop>
            <van-stepper v-model="goodsCount" min="1" max="5" integar />
          </div>
        </template>
      </van-card>
      <template #right>
        <van-button square type="danger" text="删除" @click="deleteCart()" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
    }
  },
  props: {
    item: {},
    result: []
  },
  computed: {
    goodsCount: {
      get() {
        return this.item.goodsCount
      },
      set(val) {
        this.getEditCart({ cartItemId: this.item.cartItemId, goodsCount: val })
      }
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('cart', ['getDeleteCart', 'getEditCart']),
    //删除购物项
    deleteCart() {
      Dialog.confirm({ message: '确定删除吗？' }).then(async () => {
        await this.getDeleteCart(this.item.cartItemId)
        console.log(this.result)
        this.$emit('delete', this.item.cartItemId)//触发父组件catePage删除result中对应已被删除的cartItemId信息
      })
    },
    //回到详情页
    backToDetail() {
      this.$router.push({
        name: 'DetailPage',
        params: { id: this.item.goodsId }
      })
    }
  }


}
</script>

<style lang="scss" >
#CartCard .van-swipe-cell__wrapper {
  width: 100%;
  height: 2.7733rem;
  display: flex !important;
  align-items: center;
  margin: .1rem 0;

  // 勾选
  .van-checkbox {
    flex: 2;
    background-color: #f6f6f6;
    height: 100%;
    flex-flow: column;
    justify-content: center;

    .van-checkbox__icon {
      font-size: .5rem;
    }
  }

  // 商品卡片
  .van-card {
    box-sizing: border-box;
    flex: 15;
    margin-top: 0;
    background-color: #f6f6f6;
    padding-left: 0;
    height: 100%;
    font-size: .3rem;

    .van-card__header {
      height: 100%;

      //图片盒子
      .van-card__thumb {
        height: 100%;
        width: inherit;
      }

      //图片右侧盒子
      .van-card__content {
        height: 100%;
        min-height: fit-content;

        //商品标题
        .van-card__title {
          line-height: .35rem;
        }

        //价格
        .van-card__price {

          //人民币符号
          .van-card__price-currency {
            font-size: .2rem;
            line-height: .2rem;

          }

          //价格整数部分
          .van-card__price-integer {
            font-size: .3rem;
            line-height: .3rem;
          }

          //价格小数部分
          .van-card__price-decimal {
            font-size: .2rem;
            line-height: .2rem;
          }
        }

        //数量
        .van-card__num {
          line-height: .2667rem;

          //数字
          .van-stepper__input {
            width: .4267rem;
            height: .3733rem;
          }

          //加减按钮
          .van-stepper__minus,
          .van-stepper__plus {
            width: .3733rem;
            height: .3733rem;
          }
        }

      }
    }

  }

  // 滑块删除按钮
  .van-swipe-cell__right {
    height: 100%;

    .van-button {
      height: 100%;
    }
  }
}
</style>
