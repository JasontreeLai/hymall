<template>
  <div class="toast" v-show="isShow">
    <div>{{toastMessage}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    toastMessage:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.toast{
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding:8px 10px;
  background:rgba(0,0,0,.75);
  color:#fff;
}
</style>
