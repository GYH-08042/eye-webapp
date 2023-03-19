<template>
  <div id="SearchMask" v-show="maskshow">
    <h1 v-text="'热门搜索'"></h1>
    <ul>
      <li v-for="(item, index) in list" :key="index" v-text="item" @click="skipToSearch(item)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    maskshow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => ['阿里斯顿', '电焊工', '电饭锅', '二五眼', '客家话规范的', '韩国', '刘与他人', '程序法人', '上台阶', 'DNF']
    }
  },
  activated() {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    skipToSearch(item) {
      this.$router.push(`/search?rec=${item}`)
    }
  }


}
</script>

<style lang="scss">
#SearchMask {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: white;
  padding-top: 1rem;

  h1 {
    font-size: .6rem;
    line-height: .6rem;
    font-weight: 400;
  }

  ul {
    li {
      float: left;
      margin: 5px;
      padding: 5px;
      background-color: gray;
      font-size: .16rem;
    }
  }
}
</style>
