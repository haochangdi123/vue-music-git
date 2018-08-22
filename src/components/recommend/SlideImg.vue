<template>
  <div class="slide-img" ref="slide" @touchstart="touchStart" @touchmove.stop.prevent="touchMove" @touchend.stop.prevent="touchEnd" v-if="list.length>0">
    <div class="main" ref="main">
      <div class="main-item" v-for="(item,index) of list" :key="index">
         <a :href="item.linkUrl" >
          <img :src="item.picUrl" alt="" ref="img">
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
      this.$refs.main.style.width = `${width}px`;
      this.$nextTick(() => {
        this.$refs.slide.style.height = this.$refs.main.children[0].clientHeight + 'px';
      });
      this.$refs.main.style.left = -sliderWidth + 'px';
      this.loop();
    },
    animation(offsetLeft) {
      let left = this.$refs.main.style.left;
      let width = this.$refs.slide.clientWidth;
      let bgwidht = this.$refs.main.clientWidth;
      let newLeft = parseInt(left) + offsetLeft;
      if (newLeft > 0) {
        newLeft = -bgwidht;
      } else if (newLeft < -(bgwidht - width)) {
        newLeft = 0;
      }
      this.$refs.main.style.left = newLeft + 'px';
    },
    prev() {
      this.animation(this.$refs.slide.clientWidth);
    },
    next() {
      this.animation(-this.$refs.slide.clientWidth);
    },
    loop() {
      this.timer = setInterval(() => {
        this.next();
      }, 2000);
    },
    stop() {
      clearInterval(this.timer);
    },
    touchStart(e) {
      this.stop();
      this.touch.inited = true;
      this.touch.startx = e.touches[0].clientX;
    },
    touchMove(e) {
      if (this.touch.inited) {
        this.touch.offsetW = e.touches[0].clientX - this.touch.startx;
        this.$refs.main.style.transform = `translate3d(${this.touch.offsetW}px, 0, 0)`;
      }
    },
    touchEnd() {
      let num = Math.ceil(Math.abs(this.touch.offsetW / this.$refs.slide.clientWidth));
      let left = this.touch.offsetW > 0 ? num * this.$refs.slide.clientWidth : num * -this.$refs.slide.clientWidth;
      if (Math.abs(this.touch.offsetW) > (this.$refs.slide.clientWidth / 2)) {
        this.$refs.main.style.transform = `translate3d(${left}px, 0, 0)`;
      } else {
        this.$refs.main.style.transform = `translate3d(0, 0, 0)`;
      }
      this.loop();
      this.touch.inited = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 20);
  },
  created() {
    this.touch = {};
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/style/mixin.scss';
.slide-img {
  position: relative;
  overflow: hidden;
  .main {
    position: absolute;
    background: red;
    @include clearfix();
    .main-item {
      display: inline-block;
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
