import Toast from './Toast.vue';

const obj = {}

obj.install = function(Vue) {
    
  //在 body 中添加一个 div 元素的步骤：
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //2、用 new 的方式,通过组件构造器,创建一个组件对象
  const toast = new toastContrustor()

  //3、将组件对象,手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4、toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)
  //通过在原型上定义它们使其在每个 Vue 的实例中可用
  Vue.prototype.$toast = toast; //通过在 Vue 原型上定义 组件对象 toast,让每个 vue 实例调用该组件对象 ---> this.$toast
}

export default obj;