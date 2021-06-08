import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state,payload){ //payload 为 actions 中传过来的参数
      payload.count += 1;
    },
    addToCart(state,payload){ //payload 为 actions 中传过来的参数
      state.cartList.push(payload)
    }
  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  },
  actions: {
    //对于异步操作、判断逻辑都放到 actions 中
    // addCart({state,commit},payload){}
    // addCart(context, payload) { //payload 为 调用actions时 ---> this.$store.dispatch('addCart',product) 中传过来的参数 product

    //   //查找之前数组中是否有该商品
    //   let oldProduct = context.state.cartList.find(item => {
    //     return item.iid === payload.iid
    //   })

    //   if(oldProduct) {
    //     // oldProduct.count += 1;
    //     context.commit('addCount',oldProduct)
    //   }else{
    //     payload.count = 1;
    //     payload.checked = true;
    //     // context.state.cartList.push(payload);
    //     context.commit('addToCart',payload)
    //   }
    // }

    //通过返回一个 Promise,返回相对应的信息
    addCart(context, payload) {
      return new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => {
          return item.iid === payload.iid
        })
  
        if(oldProduct) {
          context.commit('addCount',oldProduct);
          resolve('当前的商品数量 + 1');
        }else{
          payload.count = 1;
          payload.checked = true;
          context.commit('addToCart',payload);
          resolve('添加了新的商品')
        }
      })
    }
  },
  module: {}
})

export default store