<template>
  <div id="categoryPage">
    <div class="search-box">
      <CateSearch :maskshow="maskshow"></CateSearch>
    </div>
    <SearchMask :maskshow="maskshow"></SearchMask>
    <div class="cate-box">
      <SideBar ref="sidebar"></SideBar>
      <CateContent ref="catecontent"></CateContent>
    </div>
    <JdTabbar></JdTabbar>
  </div>
</template>

<script>
import JdTabbar from '@/components/JdTabbar.vue';
import CateSearch from '@/components/CateSearch.vue'
import SideBar from '@/components/SideBar.vue';
import CateContent from '@/components/CateContent.vue';
import SearchMask from '@/components/SearchMask.vue';
export default {
  name: 'CategoryPage',
  data() {
    return {
      maskshow: false,
      scrollMark1: 0,//记录sidebar滚动位置
      scrollMark2: 0,//记录content滚动条位置
      contentRecord: ''//记录离开时右侧展示面板对应的categoryId
    }
  },
  computed: {
  },
  props: {
    ifSkipShow: { Boolean, default: true }
  },
  components: { JdTabbar, CateSearch, SideBar, CateContent, SearchMask },
  beforeRouteLeave(to, from, next) {//记录休眠时滚动条位置和对应的品类搜索内容
    this.scrollMark1 = this.$refs.sidebar.scrollMark//记录sidebar滚动位置
    this.scrollMark2 = this.$refs.catecontent.scrollMark//记录content滚动位置
    this.contentRecord = this.$route.query.id//记录搜索的品类ID
    console.log('categoryPage休眠---')
    next()
  },
  activated() {
    if (this.contentRecord != '') {//如果记录过上一次的传参数据，则用上一次的继续搜索展示
      this.$router.push(`/category?id=${this.contentRecord}`)
    } else {//否则视为第一次进入分类页，默认加载第一个标签的数据
      this.$router.push('/category?id=cate30')
    }
    console.log('categoryPage激活---')
  }
}
</script>
<style lang="scss">
#categoryPage {
  height: 100%;

  // 搜索栏
  .search-box {
    width: 100%;
    position: relative;
    top: 0;
    z-index: 3;
  }

  // 菜单
  .cate-box {
    position: relative;
    margin: 0;
    height: 16.5867rem;
    overflow: hidden;
    background-color: #f6f6f6;
  }

}
</style>
