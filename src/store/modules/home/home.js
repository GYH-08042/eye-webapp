//引入获取首页数据接口函数
import { fetchHomeInfo } from "@/utils/api"

export default {
  namespaced: true,
  state: {
    //轮播图
    carousels: [],
    //秒杀
    hotGoodses: [],
    //推荐
    newGoodses: []
  },
  mutations: {
    //存储首页数据
    setHomeInfo(state, val) {
      state.carousels = val.carousels,
        state.hotGoodses = val.hotGoodses,
        state.newGoodses = val.newGoodses
    }
  },
  actions: {
    //获取首页数据接口
    getHomeInfo(store, value) {
      return fetchHomeInfo(value).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取首页数据成功---')
            store.commit('setHomeInfo', res.data.data)
          } else {
            console.log('获取首页数据失败---', res)
          }
        } else {
          console.log('请求首页数据失败---', res)
        }

      })
    }

  }
}