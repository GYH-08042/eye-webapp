<template>
  <div id="CateSearch">
    <van-button icon="arrow-left" type="primary" color="white" icon-color="black" @click="back" />
    <van-search v-model="value" :placeholder="tip" shape="round" @focus="$parent.maskshow = true" @search="skipToSearch">
    </van-search>
    <van-popover v-if="!maskshow" v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" theme="dark"
      placement="bottom-end">
      <template #reference>
        <van-button icon="ellipsis" type="primary" color="white" />
      </template>
    </van-popover>
    <van-button v-if="maskshow" type="primary" color="#d81e06" class="searchButton" @click="skipToSearch">搜索</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      showPopover: false,
      actions: [{ text: '首页', icon: 'more-o' }, { text: '分类搜索', icon: 'more-o' }, { text: '购物车', icon: 'more-o' }, { text: '我的京东', icon: 'more-o' }, { text: '浏览记录', icon: 'more-o' }],
    }
  },
  props: {
    tipData: {
      type: Array,
      default: () => ['笔记本电脑', '美的洗衣机', '旧手机', '国窖1573', '菜刀', '京东买菜', '猜你想要']
    },
    maskshow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tip() {
      return this.tipData[Math.floor(Math.random() * this.tipData.length)]
    }
  },
  methods: {
    //跳转详情
    skipToSearch() {
      if (this.value) {
        this.$router.push(`/search?rec=${this.value}`)
      } else {
        this.$router.push(`/search?rec=${this.tip}`)
      }

    },
    //右上角菜单展开栏点击
    onSelect(action) {
      switch (action.text) {
        case "首页": this.$router.replace('/home'); break;
        case "分类搜索": this.$router.replace('/category'); break;
        case "购物车": this.$router.replace('/cart'); break;
        case "我的京东": this.$router.replace('/user'); break;
        case "浏览记录": this.$router.replace('/user');
      }
    },
    //点击返回
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
#CateSearch {
  height: 1.1733rem;
  border-bottom: 1.5px solid #f6f6f6;
  display: flex;
  background-color: white;

  // 左侧按钮宽高
  &>.van-button {
    height: 100%;
    flex: 1;
    padding: 0 .3rem;

    .van-icon {
      font-size: .4rem;
      color: gray;
      line-height: .6533rem;
    }
  }

  //右侧菜单键宽高
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
        font-size: .4rem;
        color: gray;
        line-height: .6533rem;
      }
    }


  }

  /* 修改搜索框宽高 */
  .van-search {
    flex: 15;
    padding: .1333rem 0;

    // 文字大小及行高
    .van-field__body input {
      height: .64rem;
      line-height: .64rem;
      font-size: .3rem;
    }

    .van-icon {
      font-size: .4rem;
      color: gray;
      line-height: .6533rem;
    }
  }

  /* 搜索按钮宽高 */
  .searchButton {
    flex: 2;
    height: .8rem;
    padding: .0933rem .2rem;
    margin: .15rem .2rem;
    border-radius: 2px;
  }
}
</style>
