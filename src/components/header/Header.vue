<template>
   <div class="header">
      <div class="avatar"></div>
      <h2 class="title">{{msg}}</h2>
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hcd Music'
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
@import '../../common/style/mixin';
  .header {
    height: 40px;
    text-align: center;
    .avatar {
      display: inline-block;
      width: 30px;
      height: 30px;
      @include bg-image('./../../common/image/header/logo');
      background-size: 30px 30px;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .title {
      display: inline-block;
      color: #ffcd32;
      font-size: 16px;
      line-height: 40px;
    }
  }
</style>
