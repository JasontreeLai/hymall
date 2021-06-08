<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="回到顶部">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {}
  }
}
</script>

<style scoped>
.back-top{
  position:fixed; 
  right:8px;
  bottom:55px;
  z-index:99;
}
.back-top img{
  width:43px;
  height:43px;
}
</style>
