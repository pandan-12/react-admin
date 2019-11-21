import axios from 'axios';
import listMessage from '../config/listMessage';
import {
  message
} from 'antd'

// 能够拿到axios的实例对象,axios.create就能够创建一个实例对象
// axiosInstance就是Axios实例对象,用法和axios基本一样
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 基础路径,所有请求的公共路径
  timeout: 1000, // 超时 单位是ms 如果响应超过5s都没有响应结果,就自动中断请求
})

axiosInstance.interceptors.request.use(
  // 将要发送请求成功的 (内部没错) 触发回调函数
  (config) => {
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      config.data = Object.keys(config.data).reduce((prev, key) => { //
        const value = config.data[key]; // 拿到value

        return prev + `&${key}=${value}` // 之前的值加上现在的值需要用&链接
      }, '').substring(1) // '' 第二个参数想让它变成什么类型就写 这里是字符串类型
      //  substring截取
    }



    const token = '';

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config;
  },

  // 将要发送请求失败的 (内部出错) 触发回调函数
  // (error) => {
  //   // 一般没用所以一般不写
  //   return Promise.reject(error);
  // }
)


// 响应拦截器
axiosInstance.interceptors.response.use(
  // 响应成功
  ({
    data
  }) => {
    if (data.status === 0) {
      return data.data
    } else {
      message.error(data.msg)
      return Promise.reject(data.msg);
    }
  },

  // 响应失败
  (error) => {

    let errorMessage = '';

    if (error.response) {
      errorMessage = listMessage[error.response.status] || '未知错误'
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        errorMessage = '请检查网络';
      } else if (error.message.indexOf('timeout') !== -1) {
        errorMessage = '网太卡,建议砸电脑';
      } else {
        errorMessage = '未知错误'
      }
    }

    console.log(error); // 这个error是个对象 其中的message就是显示错误内容
    message.error(errorMessage)
    return Promise.reject(errorMessage)
  }
)

export default axiosInstance