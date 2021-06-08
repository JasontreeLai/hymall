<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control
      class="tab-control tab-control2"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabControlClick"
      ref="topTabControl"
      v-show="isTabFixed"
    />
    <!-- 利用 better-scroll 包裹着内容 -->
    <scroll
      class="wrapperContent"
      ref="scroll"
      :probe-type="3"
      @scrollEvent="contentScroll"
      :pull-up-load="true"
      @pullingUpEvent="loadMore"
    >
      <!-- 轮播 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImage"
      ></home-swiper>

      <!-- 推荐信息 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>

      <!-- 本周流行 --- 一张图片 -->
      <feature-view />

      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabControlClick"
        ref="tabControl"
      />

      <!-- 因 goods[currentType].list 太长,所以用 computed 计算属性(showGoods 在 computed 中)  -->
      <!-- <goods-list :goods="goods[currentType].list"></goods-list> -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 回到顶部 -->
    <back-top v-show="backTopShow" @click.native="backClick" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "commonjs/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      backTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
      itemImageListener:null,
      newRefresh:null
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //请求多个数据
    this.homeMultidata();
    //请求商品数据
    this.homeGoods("pop");
    this.homeGoods("new");
    this.homeGoods("sell");
  },
  //记录进入时,活跃状态时,scroll 高度设置为 this.saveY
  activated(){
     this.$refs.scroll.scrollTo(0, this.saveY, 0);
     this.$refs.scroll.refresh();
     this.$bus.$on("itemImageLoad",this.itemImageListener); //恢复全局事件的监听
  },
  //记录离开时,不活跃状态时,获得 scroll 滑动时的高度 getScrollY
  deactivated(){
    //保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY();

    //取消全局事件的监听 --- 即 取消 mounted() 中的 this.$bus.$on("itemImageLoad",this.itemImageListener)
    this.$bus.$off("itemImageLoad",this.itemImageListener)
  },
  mounted() {
    //调用防抖函数 debounce,防止频繁刷新
    //解释：短时间内不重复触发一个事件
    // 防抖(debounce)：当持续触发事件时,一定时间段内没有再触发事件,事件处理函数才会执行一次,如果设定的时间到来之前,又一次触发了事件,就重新开始延时;设置一个门槛值,表示两次 Ajax 通信的最小间隔时间,如果在间隔时间内(200ms 毫秒),一开始发生refresh事件,接下来又发生新的refresh事件(即发生了两次refresh事件),则不触发 Ajax 通信,并且重新开始计时,如果过了指定时间,没有发生新的refresh事件,再将数据发送出去

    // 节流(throttle)：当持续触发事件时,保证一定时间段内只调用一次事件处理函数;设置一个门槛值,表示两次 Ajax 通信的最小间隔时间,如果在间隔时间内(200ms 毫秒),一开始发生refresh事件,接下来不管发不发生新的refresh事件,不会重新开始计时,到了 200ms 时,才触发 Ajax 通信,再将数据发送出去


    //这里 refresh 重新刷新,为了重新获取 scroll 里面内容的高度
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.newRefresh()
    }
    this.$bus.$on("itemImageLoad",this.itemImageListener); 
    //父组件监听到子组件发射过来的事件(图片加载完成的事件)后,再执行 this.itemImageListener
    //父组件通过 $bus --- "事件总线" 监听子组件 GoodsListItem.vue发射过来的事件
    
    // this.$bus.$on("homeItemImageLoad",() => {
    //   resh()
    // })
  },
  methods: {
    /* 网络请求的相关方法 */
    //将请求函数封装多一层函数,再放入 created,预防 created 太乱
    homeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    homeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },

    /* 事件监听的相关方法 */
    tabControlClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.topTabControl.currentIndex = index;
    },
    backClick() {
      //直接通过 $refs 获取 标签scroll 中的 scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500); //500毫秒
    },
    contentScroll(position) {
      //1、判断 back-top 是否显示
      this.backTopShow = -position.y > 500;

      //2、判断 tab-control2 是否显示 --- 充当是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //防抖 --- debounce(func,delayTime)、节流 --- throffle
    //对于refresh(刷新)非常频繁的问题,进行防抖操作：
    //将功能性函数 debounce 放到 commonjs文件夹中 utils.js 中
    // debounce(func, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // }

    loadMore() {
      this.homeGoods(this.currentType);
      this.$refs.scroll.finishPullUp(); //直接通过 $refs 获取 标签scroll 中的 finishPullUp方法
    },
    swiperImage() {
      //等 HomeSwiper.vue 中的 一张 img 加载完成,通过 ref,捕抓 <scroll></scroll> 中的 tab-control 到顶部的距离(注意顶部是从<scroll></scroll>里面最顶部计算)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
/* #home {
  height: 100vh;
     vh --- viewport height 视口高度
     以 320 x 568 尺寸为例：此时 #home 的高度为100%的viewport(视口高度) --- 568px
} */

#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;  因 nav-bar 高度为44px 
  z-index: 9;
} */ /* 没用了 */

/* .wrapperContent {
     以 320 x 568 尺寸为例：
     当 height:100% 时,.wrapperContent 的高度为 568px;
     当 height:calc(100% - 93px) 时,.wrapperContent 的高度为 475px;
     93px 的尺寸是：nav-bar 的高度：44px、tab-bar 的高度：49px 的总和;
     因 nav-bar 使用了 position:fixed,.wrapperContent需要 margin-top:44px;
  
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px !important;
} */

.wrapperContent {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px; /* nav-bar 的高度 */
  bottom: 49px; /* tab-bar 的高度 */
  background: #fff;
}

.tab-control2 {
  position: relative;
  z-index: 9;
}
</style>
