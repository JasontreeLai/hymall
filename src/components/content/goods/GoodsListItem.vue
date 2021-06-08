<template>
  <div class="goods-list-item" @click="itemClick">
    <!-- <img
      :src="showImage"
      :alt="goodsItem.title"
      :title="goodsItem.title"
      @load="imageLoad"
    /> -->
    <img
      v-lazy="showImage"
      :alt="goodsItem.title"
      :title="goodsItem.title"
      @load="imageLoad"
    />

    <div class="goods-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data() {
    return {}
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    showImage(){
      // return this.goodsItem.image ? this.goodsItem.image: this.goodsItem.show.img
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit("itemImageLoad") 
      //子组件通过 $bus --- "事件总线" 向 父组件 Home.vue、Detail.vue发送事件(图片加载完成的事件)
      
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit("homeItemImageLoad")
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit("detailItemImageLoad")
      // }
    },
    itemClick(){
      this.$router.push({
        path:'/detail',
        query:{
          iid:this.goodsItem.iid
        }
      })
      //相当于
      //this.$router.push('/detail?iid='+ this.goodsItem.iid)


      //在 this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面
      // this.$router.push({
      //   name:'detail',
      //   params:{
      //     iid:this.goodsItem.iid
      //   }
      // })
      //相当于
      //this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-item-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-item-info .collect {
  position: relative;
}

.goods-item-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
