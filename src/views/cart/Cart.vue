<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartCount }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="wrapperContent" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

import {mapGetters} from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
  background:#fff;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.wrapperContent {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px; 
  bottom: 93px;
  background: #fff;
}
</style>
