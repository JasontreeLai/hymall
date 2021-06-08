import axios from 'axios';

export function request(config) {
  //创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })  //这块本身是一个 promise

  //axios 的拦截器
  //请求拦截
  instance.interceptors.request.use(config => { //请求成功
    //console.log('来到了 request 拦截 success 中');
    return config //放行
  }, err => { //请求失败
    //console.log('来到了 request 拦截 failure 中');
    console.log(err);
  })

  //响应拦截
  instance.interceptors.response.use(res => { //响应成功
    //console.log('来到了 response 拦截 success 中');
    return res.data //放行
  }, err => { //响应失败
    //console.log('来到了 response 拦截 failure 中');
    console.log(err);
  })

  //发送真正的网络请求
  return instance(config) //返回一个promise
}
