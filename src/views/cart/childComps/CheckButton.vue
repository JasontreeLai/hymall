<template>
    <div>
      <div class="check-button" :class="{'check':isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
      <!-- <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div> -->
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: true
      }
      // value:{
      //   type:Boolean,
      //   default:true
      // }
    },
    // data: function () {
		//   return {
		//     checked: this.value
    //   }
    // },
    // methods: {
    //   selectItem: function () {
    //     this.$emit('checkBtnClick')
    //   }
    // },
    // watch: {
		//   value: function (newValue) {
    //     this.checked = newValue;
    //   }
    // }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }

  .check-button{
    border-radius: 50%;
    border:2px solid #aaa;
  }

  .check{
    border-color:var(--color-tint);
    background: var(--color-tint);
  }
</style>
