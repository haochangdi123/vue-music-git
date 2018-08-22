<template>
  <div class="loading">
    <div class="load">
      <img src="./loading.gif" alt="" width="24" height="24">
    </div>
    <p class="text">{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '请您稍后'
    }
  },
  data() {
    return {
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    z-index: 400;
    .text {
      line-height: 20px;
      font-size: 12px;
      color: #dddddd;
    }
  }
</style>
