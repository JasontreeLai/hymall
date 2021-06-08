//工具类

//防抖函数 debounce,防止频繁刷新
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//格式化时间
export function formatDate(date, fmt) {
  //1、获取年份
  //y+ ---> 匹配1个或者多个y
  //y* ---> 匹配0个或者多个y
  //y? ---> 匹配0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //2、获取月、日、时、分、秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //12小时制
    "H+": date.getHours(), //24小时制
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}