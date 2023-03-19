//引入商品种类接口函数
import { fetchCate } from '@/utils/api.js'
//引入搜索结果接口函数
import { fetchSearchResult } from '@/utils/api.js'
//引入商品详情接口函数
import { fetchGoodsDetail } from '@/utils/api.js'

const state = {
  cateList: [],//品类列表
  cateResult: {},//品类明细
  refreshTurning: true,//CateContent强制刷新开关
  searchResult: [],//搜索结果
  goodsDetail: {}//详情数据
}

const mutations = {
  //存储品类列表
  setCateList(state, val) {
    state.cateList = val
  },
  //存储品类明细
  setCateResult(state, { cate, data }) {
    state.cateResult[cate] = data
  },
  //CateContent强制刷新
  setRefreshTurning(state) {
    state.refreshTurning = !state.refreshTurning
  },
  //存储搜索结果
  setSearchResult(state, val) {
    state.searchResult = val
  },
  //存储商品详情
  setGoodsDetail(state, val) {
    state.goodsDetail = val
  }
}

const actions = {
  //获取品类接口函数
  getCate(store) {
    return fetchCate().then(({ data: { data: res } }) => {
      const category = []
      res.forEach(item => {//将最里面一层的品类名展示在sidebar上
        item.secondLevelCategoryVOS.forEach(i => {
          category.push(...i.thirdLevelCategoryVOS)
        })
      })
      store.commit('setCateList', category)//存储品类数据
      console.log('获取品类成功---')
      store.dispatch('getCateResult', { goodsCategoryId: state.cateList[0].categoryId })//获取第一个品类的搜索结果并存储

    })
  },
  //获取品类明细接口函数
  getCateResult(store, value) {
    console.log('尝试调取搜索接口---')
    return fetchSearchResult(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log(`获取cate${value.goodsCategoryId}搜索结果成功`)
          store.commit('setCateResult', { cate: `cate${value.goodsCategoryId}`, data: res.data.data.list })
          console.log(`存储cate${value.goodsCategoryId}搜索结果成功`)
          console.log('强制刷新---')
          store.commit('setRefreshTurning')//强制刷新更新视图（隐藏右侧grid组件）
          store.commit('setRefreshTurning')//强制刷新更新视图（显示右侧grid组件）
        } else {
          console.log('获取搜索结果失败---', res)
        }
      } else {
        console.log('请求搜索结果失败---', res)
      }
    })
  },
  //获取搜索结果接口函数
  getSearchResult(store, value) {
    return fetchSearchResult(value).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('获取搜索结果成功---')
          store.commit('setSearchResult', res.data.data.list)
        } else {
          console.log('获取搜索结果失败---', res)
        }
      } else {
        console.log('请求搜索结果失败---', res)
      }
    })
  },
  //获取商品详情接口函数
  getGoodsDetail(store, val) {
    return fetchGoodsDetail(val).then(res => {
      if (res.status == 200) {
        if (res.data.resultCode == 200) {
          console.log('获取商品详情成功---')
          store.commit('setGoodsDetail', res.data.data)
        } else {
          console.log('获取商品详情失败---', res)
        }
      } else {
        console.log('请求商品详情失败---', res)
      }
    })

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}