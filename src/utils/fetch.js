import router from '@/router.js';
import axios from 'axios'
import { Notify } from 'vant';
const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,//请求超时时间
  headers: {

  }
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 如果本地有token数据则传入请求头
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem("token")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.message == '无效认证！请重新登录！') {
    Notify({ message: '登陆已超时，请重新登录！', type: 'warning' })
    router.replace('/login')
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance