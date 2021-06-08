<template>
  <swiper v-if="topImages.length" class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  data() {
    return {}
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.detail-swiper{
  height:300px;
  overflow: hidden;
}
.slide {
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
