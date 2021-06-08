import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //通过 Vue原型 给 $bus 赋值一个 Vue实例,从而建立 "事件总线"

// 安装自定义 toast插件
Vue.use(toast)


//解决移动端 300ms(毫秒) 的延迟
import FastClick from 'fastclick'
FastClick.attach(document.body);


//使用懒加载插件 --- 修改 img v-lazy="src"
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
