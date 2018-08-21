<template>
  <div class="scroll" ref="wrap">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrap);
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
</style>
