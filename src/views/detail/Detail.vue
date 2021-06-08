<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="wrapperContent" ref="scroll" :probe-type="3" @scrollEvent="contentScroll">
      <!-- 因为 v-bind:属性名 中 属性名不区分大小写,写属性名时,尽量不用驼峰写法 topImages --- 写成这样：top-images -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
      <!-- detail-goods-info、goods-list-item 都用了图片加载 @load="",等图片都加载完成后,执行 scroll 中的 refresh：this.$refs.scroll.refresh() -->
    </scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>

    <!-- 回到顶部 -->
    <back-top v-show="backTopShow" @click.native="backClick" />
    
    <!-- 制作toast 提示 有两种方式 -->
    <!-- 制作 toast 提示的方式一： -->
    <!-- <toast-tip :isShow="isShow" :toastMessage="toastMessage"/> -->

    <!-- 制作 toast 提示的方式二(封装插件的方式)： 
    直接创建 toast 文件夹中 index.js
    -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";
// import ToastTip from "components/common/toast/ToastTip";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import { debounce } from "commonjs/utils";
import {itemListenerMixin,backTopMixin} from "commonjs/mixin";

export default {
  name: "Detail",
  mixins:[itemListenerMixin,backTopMixin], //混入
  data(){
    return {
      iid:null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImageListener:null,
      themeTopY:[], //存储 detailNavBar中 商品、参数、评论、推荐 的高度
      currentIndex:0,
      // backTopShow: false,

      // isShow:false,
      // toastMessage:''
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // BackTop,
    
    // ToastTip
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.query.iid;
    //根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      
      //获取顶部的图片轮播数据
      //此时每个 goods-list-item 点击跳转到 detail.vue 显示的内容是一样的,是因为之前在App.vue中使用了 keep-alive 保持状态,导致输出的 iid 是一样;想要 detail.vue 显示不一样的内容,需要在App.vue中keep-alive 添加 exclude="Detail"
      this.topImages.push(...data.itemInfo.topImages)
      
      //获取商品介绍信息
       this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //获取商品详情数据
      this.detailInfo = data.detailInfo;

      //获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //获取商品评论数据
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  // mounted(){
  //   //调用防抖函数 debounce,防止频繁刷新
  //   const newRefresh = debounce(this.$refs.scroll.refresh, 200);
  //   this.itemImageListener = () => {
  //     newRefresh()
  //   }
  //   this.$bus.$on("itemImageLoad",this.itemImageListener); 
  //   //父组件通过 $bus --- "事件总线" 监听子组件 GoodsListItem.vue发射过来的事件
    
  //   // this.$bus.$on("detailItemImageLoad",() => {
  //   //   newRefresh()
  //   // })
  // },
  destroyed(){
    //取消全局事件的监听 --- 即 取消 mounted() 中的 this.$bus.$on("itemImageLoad",this.itemImageListener)
    this.$bus.$off("itemImageLoad",this.itemImageListener)
  },
  methods:{
    imageLoad(){
      //使用了混入,从 mixin.js 中获取 newRefresh() --- 包含了防抖函数和refresh()
      this.newRefresh()

      // this.themeTopY.push(0);
      // this.themeTopY.push(this.$refs.param.$el.offsetTop);
      // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      // 放入防抖函数 debounce() 中,预防频繁加载
      //因为 debounce() 返回的是一个函数,调用 debounce() 函数,应该是 debounce()()
      // debounce(() => {
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      // }, 200)();

      debounce(() => {
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Infinity);
        // this.themeTopY.push(Number.MAX_VALUE);
      }, 200)();
    },
    titleClick(index){ //点击标题滚动到对应的内容
       this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100); //100毫秒
    },
    contentScroll(position) { //滚动内容显示对应的标题
      // 方法一：
      // const positionY = -position.y;

      // // [0, 15924, 17195, 17410]
      // //第一档：i < length - 1
      // //positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])
      // //positionY 大于等于0,小于15924, index = 0;
      // //positionY 大于等于15924,小于17195, index = 1;
      // //positionY 大于等于17195,小于17410, index = 2;

      // //第二档：i === length -1
      // //positionY >= this.themeTopY[length-1]
      // //positionY 大于等于17410,index = 3;

      // let length = this.themeTopY.length;

      // for(let i = 0; i < length; i++) {
      //   // this.currentIndex != i --- 防止赋值的过程过于频繁
      //   if(this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1]) || (i === length -1 && positionY >= this.themeTopY[length-1]))){
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = i;
      //   }
      // }
      
      // 方法二：
      const positionY = -position.y;
      //[0, 15924, 17195, 17410, Infinity]
      //或者
      //[0, 15924, 17195, 17410, 1.7976931348623157e+308]

      //positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])
      //positionY 大于等于0,小于15924, index = 0;
      //positionY 大于等于15924,小于17195, index = 1;
      //positionY 大于等于17195,小于17410, index = 2;
      //positionY 大于等于17410,小于非常大的值(如：Number.MAX_VALUE 最大值;或者Infinity 无穷大),index = 3;
      let length = this.themeTopY.length;
      for(let i = 0; i < length - 1; i++) {
        // this.currentIndex != i --- 防止赋值的过程过于频繁
        if(this.currentIndex != i && (i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }

      // 判断 back-top 是否显示
      this.backTopShow = -position.y > 500;
    },
    // backClick() {
    //   //直接通过 $refs 获取 标签scroll 中的 scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0, 500); //500毫秒
    // }

    addCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车里面,并且返回添加到购物车成功信息(then() 获取 Promise 信息)
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        // this.toastMessage = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.toastMessage = '';
        //   this.isShow = false;
        // },1500)
        
        this.$toast.show(res,1500)
      })
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9; /* 为了遮挡 App.vue 中的 main-tab-bar */
  background:#fff;
  height: 100vh;
}
.detail-nav{
  background:#fff;
}
.wrapperContent {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px; /* nav-bar 的高度 */
  bottom: 58px; /* tab-bar 的高度 */
  background: #fff;
}
</style>
