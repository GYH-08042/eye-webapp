<template>
  <div id="LoginTitle">
    <van-button icon="arrow-left" type="primary" color="white" icon-color="black" @click="back" />
    <div v-text="title"></div>
    <span></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '请传入标题'
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }


}
</script>

<style lang="scss">
/* 修改整体高度 */
#LoginTitle {
  height: 1.1733rem;
  border-bottom: 1.5px solid #f6f6f6;
  display: flex;
  background-color: white;

  // 按钮宽高
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

  /* 修改标题大小 */
  &>div {
    height: 100%;
    flex: 15;
    line-height: 1.1733rem;
    font-size: .5rem;
    text-align: center;
  }

  &>span {
    flex: 2
  }
}
</style>
