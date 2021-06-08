<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" :title="item.title" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  padding:15px 0 20px;
  border-bottom:10px solid #eee;
}
.recommend-item{
  flex: 1;
  text-align: center;
  font-size:12px;
}
.recommend-item img {
  width:70px;
  height:70px;
  margin-bottom: 10px;
}
</style>
