<template>
  <div id="HomeSearch" :class="{ 'sticky': sticky }">
    <van-button icon="wap-nav" type="primary" to="/category" color="#d81e06"></van-button>
    <van-search :placeholder="tip" background="#d81e06" shape="round" disabled @click="skipToSearch">
      <template #left-icon><img src="@/assets/jd.png" /><img src="@/assets/seperate.png" /><img
          src="@/assets/search.png" /></template>
    </van-search>
    <van-button icon="contact" type="primary" to="/user" color="#d81e06">
      <div v-show="!ifLogin" class="toggle">登录</div>
    </van-button>
    <div v-show="maskshow" class="mask">
      <van-search v-model="value" :placeholder="tip" @search="search" @cancel="cancel" background="#d81e06" shape="round"
        show-action>
        <template #right-icon>
          <van-icon name="success" @click="search" />
        </template>
      </van-search>
      <SearchMask :maskshow="maskshow"></SearchMask>
    </div>
  </div>
</template>

<script>
import SearchMask from './SearchMask.vue';
export default {
  data() {
    return {
      value: '',
      maskshow: false
    };
  },
  props: {
    sticky: { type: Boolean, default: false },
    tipData: {
      type: Array,
      default: () => ['笔记本电脑', '美的洗衣机', '旧手机', '国窖1573', '菜刀', '京东买菜', '猜你想要']
    }
  },
  computed: {
    tip() {
      return this.tipData[Math.floor(Math.random() * this.tipData.length)]
    },
    ifLogin() {
      if (localStorage.getItem('token')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 在首页点击搜索框则展开搜索面板
    skipToSearch() {
      this.maskshow = true;
    },
    //在搜索面板点击取消
    cancel() {
      this.maskshow = false
    },
    //在搜索面板点击enter
    search() {
      this.$router.push(`/search?rec=${this.value || this.tip}`)
    }
  },
  components: {
    SearchMask
  }
};
</script>

<style lang="scss">
.sticky {
  position: sticky;
  top: 0;
  z-index: 1;
}

/* 设置整体高度 */
#HomeSearch {
  display: flex;
  height: 1.1733rem;
}

/* 修改按钮宽度及边框 */
#HomeSearch>button {
  border: 0;
  border-radius: 0;
  flex: 1;
  height: 100%
}

/* 修改两侧icon图标大小 */
#HomeSearch button.van-button--normal {
  font-size: .4rem;
}

/* 缩小搜索框背景区域，修改宽度 */
#HomeSearch .van-search {
  border: 0;
  padding: .2rem .09rem !important;
  flex: 20
}

/* 修改图标高度 */
#HomeSearch .van-cell>div {
  height: .4rem;
}

#HomeSearch .van-cell>div img {
  float: left;
  width: .4rem !important;
}

/* 修改搜索高度 */
#HomeSearch .van-field__body {
  height: .4rem;
}

/* 修改文字行高 */
#HomeSearch .van-field__control {
  font-size: .4rem;
  line-height: .6667rem;
}

/* 右侧按钮的遮罩层：若未登录则盖一层文字 */
#HomeSearch .toggle {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  line-height: 1.1733rem;
  background-color: #d81e06
}

/* 搜索面板 */
#HomeSearch .mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: pink;

  &>.van-search {
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;

    //取消默认的放大镜图标
    .van-icon-search:before {
      content: ''
    }

  }


}
</style>
