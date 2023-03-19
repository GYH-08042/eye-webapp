<template>
  <div class="OrderCard">
    <van-tabs v-model="active">
      <van-tab v-for="(item1, index) in status" :key="index" :title="item1">
        <div v-for="item2 in currentList" :key="item2.orderId" @click=toOrderDetail(item2)>
          <h3 class="orderNo" v-text="`订单编号：${item2.orderNo}`"></h3>
          <van-card v-for="item3 in item2.newBeeMallOrderItemVOS" :key="item3.goodsId" :num="item3.goodsCount"
            :price="item3.sellingPrice.toFixed(2)" :title="item3.goodsName"
            :thumb="`http://192.168.1.3:28019${item3.goodsCoverImg}`">
            <template #tags>
              <van-tag plain type="danger">{{ item2.orderStatusString }}</van-tag>
            </template>
            <template #footer>
              <span v-text="`合计：￥${item3.goodsCount * item3.sellingPrice.toFixed(2)}`"></span>
            </template>
          </van-card>
          <h3 class="totalPrice" v-text="`订单总额：￥${item2.totalPrice.toFixed(2)}`" style="color:brown"></h3>
          <hr>
        </div>
        <van-empty v-show="!currentList?.length" :description="`暂无${item1}订单`" />
      </van-tab>
    </van-tabs>
    <div v-if="ifOperate" class="detail">
      <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
      <van-steps :active="step" active-color="brown">
        <van-step>提交</van-step>
        <van-step>付款</van-step>
        <van-step>配货</van-step>
        <van-step>发货</van-step>
        <van-step>完成</van-step>
      </van-steps>
      <h3 v-show="step == -1" style="color:black;text-align: center; font-size: .3rem;margin-left: .3rem;">订单已关闭</h3>
      <van-card v-for="item in orderDetail.newBeeMallOrderItemVOS" :key="item.goodsId" :num="item.goodsCount"
        :price="item.sellingPrice.toFixed(2)" :title="item.goodsName"
        :thumb="`http://192.168.1.3:28019${item.goodsCoverImg}`" @click="toGoodsDetail(item)">
        <template #footer>
          <span v-text="`合计：￥${item.goodsCount * item.sellingPrice.toFixed(2)}`"></span>
        </template>
      </van-card>
      <h3 v-text="`订单总额：￥${orderDetail.totalPrice.toFixed(2)}`" style="color:brown"></h3>
      <h3 v-text="`订单编号：${orderDetail.orderNo}`" style="color:brown"></h3>
      <h3 v-text="`订单创建时间：${orderDetail.createTime}`" style="color:brown"></h3>
      <hr>
      <van-button v-show="step == 0" class="option" round type="info" @click="toPay">去支付</van-button>
      <van-button v-show="step <= 2 && step != -1" class="option" round type="default" @click="toCancel">取消订单</van-button>
      <van-button v-show="step == 3" class="option" round type="warning" @click="toFinish">确认收货</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      status: ['全部', '待支付', '待确认', '待发货', '已发货', '成功', '已关闭'],//分页标签
      ifOperate: false, //控制编辑框的显示与隐藏
      active: 0,//当前标签页索引值
    };
  },
  computed: {
    ...mapState('order', ['orderList', 'orderNeedPay', 'orderNeedConfirm', 'orderNeedDispatch', 'orderDispatching', 'orderFinished', 'orderClosed', 'orderDetail']),
    step() {//订单详情步骤条状态（从0起）
      return this.orderDetail.orderStatus//记录订单状态用于渲染步骤条
    },
    currentList() {
      let result = []
      switch (this.active) {
        case 0: result = this.orderList; break
        case 1: result = this.orderNeedPay; break
        case 2: result = this.orderNeedConfirm; break
        case 3: result = this.orderNeedDispatch; break
        case 4: result = this.orderDispatching; break
        case 5: result = this.orderFinished; break
        case 6: result = this.orderClosed
      }
      return result
    }
  },
  async mounted() {
    await this.getOrderList()//立刻获取待支付订单列表用于渲染
  },
  methods: {
    ...mapActions('order', ['getOrderList', 'getOrderDetail', 'getCancelOrder', 'getOrderFinished', 'getPaySuccess']),
    //查看订单详情
    async toOrderDetail(item2) {
      await this.getOrderDetail(item2.orderNo)//调取详情接口
      this.ifOperate = true
    },
    //在详情界面点击返回
    onClickLeft() {
      this.ifOperate = false;//关闭详情框
    },
    //查看商品详情
    toGoodsDetail(item) {
      this.$router.push({
        name: 'DetailPage',
        params: { id: item.goodsId }
      })
    },
    //去模拟支付
    async toPay() {
      await this.getPaySuccess({ orderNo: this.orderDetail.orderNo, payType: 1 })//调模拟支付接口
      await this.getOrderDetail(this.orderDetail.orderNo)//刷新详情数据
      //重启详情框刷新详情视图
      this.ifOperate = false;
      this.ifOperate = true;
    },
    //取消订单
    toCancel() {
      this.getCancelOrder(this.orderDetail.orderNo)//调取消订单接口
      this.getOrderDetail(this.orderDetail.orderNo)//刷新详情
      this.ifOperate = false;//关闭详情框
    },
    //确认收货
    toFinish() {
      this.getOrderFinished(this.orderDetail.orderNo)//调确认收货接口
      this.getOrderDetail(this.orderDetail.orderNo)//刷新详情
    }
  }
}

</script>


<style lang="scss">
.OrderCard {
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scroll {
    width: 0;
  }


  //订单列表
  &>.van-tabs--line {
    height: 100%;

    &>.van-tabs__content {
      height: calc(100% - 44px);
      overflow-y: scroll;

      .van-tab__pane {
        height: 100%;

        // 订单表头
        .orderNo {
          font-size: .2rem;
          margin-left: .3rem
        }

        //订单总额
        .totalPrice {
          text-align: right;
          font-size: .2rem;
          margin-right: .3rem;
        }

      }

    }
  }



  //订单详情框
  .detail {
    box-sizing: border-box;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;


    &::-webkit-scrollbar {
      width: 0
    }

    //订单详情信息
    h3 {
      text-align: right;
      font-size: .2rem;
      margin-right: .3rem;
    }

    //支付按钮
    .option {
      float: right;
      margin-right: .3rem
    }
  }
}
</style>
