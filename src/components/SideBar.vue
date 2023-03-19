<template>
  <div id="SideBar" ref="SideBar">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item v-for="item in cateList" :key="item.categoryId" :title="item.categoryName"
        :to="`/category?id=cate${item.categoryId}`" @click="onChange(item)" ref="vanSidebarItem" />
    </van-sidebar>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      activeKey: 0,//选中标签的索引号
      scrollMark: 0,//记录滚动条位置
    }
  },
  watch: {
    activeKey(nv, ov) {
      // 点击后让被选中标签滑动置顶，并记录此时的滚动条位置
      if (nv != ov) {
        this.$refs.SideBar.scrollTop = this.activeKey * window.getComputedStyle(document.querySelector('#SideBar .van-sidebar-item')).height.replace('px', '')
        this.scrollMark = this.activeKey * window.getComputedStyle(document.querySelector('#SideBar .van-sidebar-item')).height.replace('px', '')
      }
    }
  },
  computed: {
    ...mapState('goods', ['cateList', 'cateResult']),
  },
  async mounted() {
    if (this.cateList.length == 0) {//数据库没数据才调接口
      await this.getCate()
    }
  },
  methods: {
    ...mapActions('goods', ['getCate', 'getCateResult']),
    async onChange(item) {//切换标签时获取数据，用于右侧面板渲染
      if (this.cateResult[`cate${item.categoryId}`] == undefined) {
        console.log(`准备获取cate${item.categoryId}的搜索结果---`, item.categoryId)
        this.getCateResult({ goodsCategoryId: item.categoryId })
      }
    }
  },
  activated() {
    this.$refs.SideBar.scrollTop = this.$parent.scrollMark1
    console.log('sidebar激活---', this.$refs.SideBar.scrollTop, this.$parent.scrollMark1)
  }
}
</script>

<style lang="scss" >
#SideBar {
  width: 2.2667rem;
  height: 16.5867rem;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }



  // 组件
  .van-sidebar {
    width: 100%;
    margin-bottom: 2rem;


    // 未选中标签格
    .van-sidebar-item {
      width: 100%;
      padding: .1333rem 0;
      text-align: center;
      font-size: .2rem;

      // 文字
      .van-sidebar-item__text {
        line-height: 1rem;
      }
    }

    // 选中标签格
    .van-sidebar-item--select {
      &::before {
        background-color: transparent;
      }

      font-size: .2rem;
      color:red;
    }
  }
}
</style>
