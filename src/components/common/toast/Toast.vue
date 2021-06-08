<template>
  <div class="toast" v-show="isShow">
    <div>{{toastMessage}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      isShow:false,
      toastMessage:''
    }
  },
  methods:{
    show(message,duration) {
      this.isShow = true;
      this.toastMessage = message;
      setTimeout(() => {
        this.isShow = false;
        this.toastMessage = '';
      },duration)
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
  z-index:999;
}
</style>
