<template>
  <div id="CartTitle">
    <van-button icon="arrow-left" type="primary" color="white" icon-color="black" @click="back" />
    <div v-text="title"></div>
    <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" theme="dark"
      placement="bottom-end">
      <template #reference>
        <van-button icon="ellipsis" type="primary" color="white" class="ellipsis" />
      </template>
    </van-popover>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      actions: [{ text: '删除所选', icon: 'more-o' }],
      showPopover: false,
    }
  },
  props: {
    title: {
      type: String,
      default: '请传入标题'
    },
    result: []//已勾选购物项的cartItemId合集
  },
  methods: {
    ...mapActions('cart', ['getDeleteCart']),
    onSelect(action) {
      switch (action.text) {
        case "删除所选":
          Dialog.confirm({ message: '确定删除吗？' }).then(() => {
            this.result.forEach(async item => {
              await this.getDeleteCart(item)//调用购物项删除接口
            })
            this.$emit('delete');//触发父组件catePage清空result
          })
      }
    },
    back() {
      if (this.maskshow) {
        this.$parent.maskshow = false;
      } else {
        this.$router.replace('/home')
      }
    }
  }


}
</script>

<style lang="scss">
/* 修改整体高度 */
#CartTitle {
  height: 1.1733rem;
  border-bottom: 1.5px solid #f6f6f6;
  display: flex;
  background-color: white;

  // 两侧按钮宽高
  &>.van-button {
    height: 100%;
    flex: 1;
    padding: 0 .3rem;

    .van-icon {
      color: gray;
      font-size: .4rem;
      line-height: .6533rem;
    }
  }

  .van-popover__wrapper {
    height: 100%;
    flex: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-button {
      flex: 1;
      width: 100%;
      height: 100%;

      &::before {
        border: 0;
      }

      .van-icon {
        font-size: .6533rem;
        color: gray;
        line-height: .6533rem;

      }
    }
  }

  /* 修改标题大小 */
  &>div {
    height: 100%;
    flex: 15;
    line-height: 1.1733rem;
    font-size: .5rem;
    text-align: center;
  }
}
</style>
