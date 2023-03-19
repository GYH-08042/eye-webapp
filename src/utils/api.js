import fetch from './fetch.js'
//获取首页数据（轮播图、新品、推荐）
export function fetchHomeInfo(params = {}) {
  return fetch({
    url: '/api/v1/index-infos',
    method: 'get',
    params
  })
}
//获取商品分类类名
export function fetchCate(params = {}) {
  return fetch({
    url: '/api/v1/categories',
    method: 'get',
    params
  })
}

//获取搜索列表
export function fetchSearchResult(params = {}) {
  return fetch({
    url: '/api/v1/search',
    method: 'get',
    params
  })
}

//获取商品信息
export function fetchGoodsDetail(goodsId) {
  return fetch({
    url: `/api/v1/goods/detail/${goodsId}`,
    method: 'get',
  })
}

//获取用户信息
export function fetchUser(params = {}) {
  return fetch({
    url: '/api/v1/user/info',
    method: 'get',
    params
  })
}

//登录接口
export function fetchLogin(data = {}) {
  return fetch({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

//登出接口
export function fetchLogout(data = {}) {
  return fetch({
    url: '/api/v1/user/logout',
    method: 'post',
    data
  })
}

//用户注册接口
export function fetchRegistry(data = {}) {
  return fetch({
    url: '/api/v1/user/register',
    method: 'post',
    data
  })
}

//修改个人信息接口
export function fetchEditInfo(data = {}) {
  return fetch({
    url: '/api/v1/user/info',
    method: 'put',
    data
  })
}

//获取地址列表接口
export function fetchAddressList(params = {}) {
  return fetch({
    url: '/api/v1/address',
    method: 'get',
    params
  })
}

//获取默认地址接口
export function fetchDefaultAddress(params = {}) {
  return fetch({
    url: '/api/v1/address/default',
    method: 'get',
    params
  })
}

//获取某地址详情接口
export function fetchAddressDetail(addressId) {
  return fetch({
    url: `/api/v1/address/${addressId}`,
    method: 'get',
  })
}

//删除地址接口
export function fetchDeleteAddress(addressId) {
  return fetch({
    url: `/api/v1/address/${addressId}`,
    method: 'delete',
  })
}

//添加地址接口
export function fetchAddAddress(data = {}) {
  return fetch({
    url: '/api/v1/address',
    method: 'post',
    data
  })
}

//修改地址接口
export function fetchEditAddress(data = {}) {
  return fetch({
    url: '/api/v1/address',
    method: 'put',
    data
  })
}

//加入购物车接口
export function fetchAddCart(data = {}) {
  return fetch({
    url: '/api/v1/shop-cart',
    method: 'post',
    data
  })
}

//获取购物车列表接口
export function fetchCartList(params = {}) {
  return fetch({
    url: '/api/v1/shop-cart',
    method: 'get',
    params
  })
}

//修改购物项数据接口
export function fetchEditCart(data = {}) {
  return fetch({
    url: '/api/v1/shop-cart',
    method: 'put',
    data
  })
}

//删除购物项接口
export function fetchDeleteCart(cartId) {
  return fetch({
    url: `/api/v1/shop-cart/${cartId}`,
    method: 'delete',
  })
}

//生成订单接口
export function fetchSaveOrder(data = {}) {
  return fetch({
    url: '/api/v1/saveOrder',
    method: 'post',
    data
  })
}

//获取订单列表接口
export function fetchOrderList(data = {}) {
  return fetch({
    url: '/api/v1/order',
    method: 'get',
    data
  })
}

//订单详情接口
export function fetchOrderDetail(orderNo) {
  return fetch({
    url: `/api/v1/order/${orderNo}`,
    method: 'get'
  })
}

//模拟支付成功接口
export function fetchPaySuccess(params = {}) {
  return fetch({
    url: '/api/v1/paySuccess',
    method: 'get',
    params
  })
}

//取消订单接口
export function fetchCancelOrder(orderNo) {
  return fetch({
    url: `/api/v1/order/${orderNo}/cancel`,
    method: 'put'
  })
}

//确认收货接口
export function fetchOrderFinished(orderNo) {
  return fetch({
    url: `/api/v1/order/${orderNo}/finish`,
    method: 'put',
  })
}