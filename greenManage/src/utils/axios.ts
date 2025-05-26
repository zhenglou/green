import axios, { AxiosInstance } from "axios";
import { getStorage } from "./storage";
const instance:AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081'
});

instance.defaults.headers.common['token'] = getStorage("token");
// instance.defaults.headers.common['Authorization'] = `Bearer ${getStorage("token")}`;
// instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.timeout = 5000;
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config);
  
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;