<template>
  <div class="musicList">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="bg">
      <img>
      <div class="btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
    </div>
    <div class="main">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>
