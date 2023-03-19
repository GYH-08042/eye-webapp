<template>
  <div id="CartSubmit">
    <div class="SelectAddress">
      <h1>本次订单收货地址：</h1>
      <van-dropdown-menu direction="up" active-color="#1989fa">
        <van-dropdown-item v-model="selectedAddress" :options="list" />
      </van-dropdown-menu>
    </div>
    <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedAddress: ''//本次订单选中的地址
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapState('user', ['addressList']),
    //选中的总金额
    sum() {
      return this.cartList.reduce((sum, item1) => {//result是所有被选中的购物项的cateItemId的集合数组，筛选求和
        return this.$parent.result.some(item2 => { return item1.cartItemId == item2 }) ? sum + item1.goodsCount * item1.sellingPrice * 100 : sum + 0
      }, 0)
    },
    checked: {
      get() {//通过比较勾选的数量和购物车列表的length来判断是否全选了
        if (this.cartList.length) {
          return this.$parent.result.length == this.cartList.length
        } else {
          return false
        }

      },
      set(val) {//点击就触发cartPage页面中checkboxGroup的全选/全否功能
        if (this.cartList.length) {
          this.$parent.$refs.checkboxGroup.toggleAll(val)
        } else {
          Toast('没有商品可勾选哦')
        }

      }
    },
    //对仓库中的地址列表做数据处理，按组件要求的数据格式进行渲染
    list() {
      const list = []
      if (this.addressList) {
        Object.values(this.addressList).forEach(({ addressId, cityName, defaultFlag, detailAddress, provinceName, regionName, userName, userPhone }) => {
          list.push({
            text: `${userName}${userPhone}${provinceName}省${cityName}市${regionName}区${detailAddress}`,
            value: addressId
          })
          if (defaultFlag == '0001') { this.selectedAddress = addressId }//优先勾选默认地址
        })
      }
      return list
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('order', ['getSaveOrder']),
    //点击提交
    async onSubmit() {
      if (this.$parent.result.length == 0) {//如果一个也没勾选则不能提交
        Toast('您未勾选任何一个购物项')
      } else {
        console.log({
          addressId: this.selectedAddress,
          cartItemIds: this.$parent.result
        })
        await this.getSaveOrder({//调取生成订单接口
          addressId: this.selectedAddress,
          cartItemIds: this.$parent.result
        })
        this.$router.push('/user/order')
      }
    }

  }


}
</script>

<style lang="scss" >
#CartSubmit {
  width: 100vw;
  height: fit-content;
  position: fixed;
  bottom: 50px;

  // 地址栏
  .SelectAddress {
    position: absolute;
    bottom: 1.3333rem;
    height: fit-content;
    width: 100%;
    color: brown;

    h1 {
      text-indent: .3rem;
      font-size: .3rem;
      line-height: .3rem;
    }

    .van-dropdown-menu__title {
      padding: 0 .6rem;
      font-size: .4rem;
      line-height: .4rem;
    }


  }

  //提交栏
  .van-submit-bar {
    position: absolute;

    bottom: 0;

    .van-submit-bar__bar {
      height: 1.3333rem;
      font-size: .1867rem;

      //钩钩
      .van-checkbox__icon {
        font-size: .5333rem;
      }

      //全选文字
      .van-checkbox__label {
        line-height: .3rem;
      }

      //合计
      .van-submit-bar__text {

        //金额
        .van-submit-bar__price {
          font-size: .4rem;

          //整数部分
          .van-submit-bar__price--integer {
            font-size: .5rem;
          }
        }
      }

      //提交按钮
      .van-button--normal {
        font-size: .4rem;
        line-height: .4rem;
        padding: .3rem .5rem;
        height: fit-content;
        width: fit-content;
      }



    }
  }

}
</style>
