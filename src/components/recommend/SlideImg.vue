<template>
  <div class="slide-img" ref="slide">
    <div class="main" ref="main">
      asd
      <div class="main-item" v-for="(item,index) of list" :key="index">
         <a :href="item.linkUrl" >
          <img :src="item.picUrl" alt="">
        </a>
      </div>
    </div>
    <div class="buttom">
      <span class="btn"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      timer: null // 定时器
    };
  },
  methods: {
    init() {
      this.childrenList = this.$refs.main.children;
      let width = 0;
      let sliderWidth = this.$refs.slide.clientWidth;
      for (let i = 0; i < this.childrenList.length; i++) {
        this.childrenList[i].style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      width = width + 2 * sliderWidth;
      this.$refs.main.style.width = `${width}px`;
      this.$refs.slide.style.height = this.$refs.main.clientHeight + 'px';
      this.next();
    },
    next() {
      this.$refs.main.style.left = this.$refs.slide.clientWidth + 'px';
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 20);
  }
};
</script>

<style lang="scss" scoped>
.slide-img {
  position: relative;
  overflow: hidden;
  .main {
    position: absolute;
    background: red;
    .main-item {
      float: left;
      a {
          display: block;
          img {
            display: block;
            width: 100%;
          }
        }
    }
  }
}
</style>
