<template>
  <swiper v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="item.link + index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" :title="item.title" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data(){
    return {
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){ //只统计一张图片加载完成的情况
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
.slide {
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
