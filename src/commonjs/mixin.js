import { debounce } from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImageListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.newRefresh()
    }
    this.$bus.$on("itemImageLoad",this.itemImageListener); 
  }
} 

import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  data(){
    return {
      backTopShow: false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick() {
      //直接通过 $refs 获取 标签scroll 中的 scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500); //500毫秒
    }
  }
}