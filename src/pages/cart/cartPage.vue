<template>
  <div id="CartPage">
    <SkipToApp text="点击跳转APP" buttonText="立即打开" buttonColor="#d81e06" :ifSkipShow="ifSkipShow"><template #icon><img
          src="@/assets/logo.png" alt=""></template></SkipToApp>
    <CartTitle :title="'购物车'" :result="result"></CartTitle>
    <div class="cardbox">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <CartCard v-for="item in cartList" :item="item" :key="item.cartItemId" :result="result"
          @delete="($event) => { if (result.indexOf($event) != -1) { result.splice(result.indexOf($event), 1) } }"
          @clean="this.result = []">
        </CartCard>
      </van-checkbox-group>
      <van-empty v-show="!cartList?.length" description="购物车太空啦！"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png" />
      <CartSubmit></CartSubmit>
    </div>
    <JdTabbar></JdTabbar>
  </div>
</template>

<script>
import JdTabbar from '@/components/JdTabbar.vue';
import SkipToApp from '@/components/SkipToApp.vue';
import CartTitle from '@/components/CartTitle.vue';
import CartCard from '@/components/CartCard.vue';
import CartSubmit from '@/components/CartSubmit.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CartPage',
  data() {
    return {
      result: [],//勾选购物项的cartItemId集合
    }
  },
  props: {
    ifSkipShow: { Boolean, default: true }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapState('user', ['defaultAddress'])
  },
  created() {
  },
  async mounted() {
    if (!this.getDefaultAddress.addressId) {//如果个人中心已经调过地址接口了，就不进行下一步了
      //获取默认地址
      this.getDefaultAddress()
      //获取地址列表
      this.getAddressList()
    }
    //获取购物车列表
    await this.getCartList()
    this.$refs.checkboxGroup.toggleAll(true)//初始化：默认全部勾选
  },
  methods: {
    ...mapActions('cart', ['getCartList']),
    ...mapActions('user', ['getDefaultAddress', 'getAddressList'])
  },
  components: { JdTabbar, SkipToApp, CartTitle, CartCard, CartSubmit },
  activated() {
    console.log('CartPage激活了---')
    this.$refs.checkboxGroup.toggleAll(true)//初始化：默认全部勾选
  }

}
</script>

<style lang="scss" scoped>
.cardbox {
  box-sizing: border-box;
  width: 100%;
  height: 16.5867rem;
  padding-bottom: 4.6rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0
  }
}
</style>


