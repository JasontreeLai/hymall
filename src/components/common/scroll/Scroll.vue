<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true //开启 click,为了可以监听div点击事件,譬如：home页面中的 tab-control标签
    });

    //监听滚动位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scrollEvent", position);
      });
    }

    //监听 scroll 滚动到底部(上拉事件)
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUpEvent");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 100) {
      //默认 100 毫秒
      return this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      return this.scroll && this.scroll.refresh(); //等所有的异步操作(如：图片)加载完成后,执行 refresh(),让 BScroll 重新计算 scrollerHeight 的值 ---> 通过 @load="imageLoad" 监测 GoodsListItem.vue 中的图片加载完成后,执行函数 imageLoad
    },
    finishPullUp() { //完成加载
      return this.scroll && this.scroll.finishPullUp(); //告诉函数上拉加载更多已完成,可以下次继续执行上拉加载更多
    },
    getScrollY() { //获取 scroll 滑动的高度
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped></style>
