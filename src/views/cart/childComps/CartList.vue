<template>
    <div id="cartList">
      <!-- <scroll class="wrapperContent" ref="scroll">
        <cart-list-item
          v-for="item in cartList"
          :key="item.iid"
          :item-info="item"
        ></cart-list-item> 
      </scroll> -->
      <cart-list-item
          v-for="item in cartList"
          :key="item.iid"
          :item-info="item"
      ></cart-list-item> 
    </div>
</template>

<script>
import CartListItem from "./CartListItem";

// import Scroll from "components/common/scroll/Scroll";

import {mapGetters} from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    // Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  // activated(){
  //   this.$refs.scroll.refresh()
  // }
}
</script>

<style scoped>
/* #cartList{
  height:calc(100% - 44px - 93px);
} */
/* .wrapperContent{
  height:100%;
  overflow: hidden;
} */
</style>
