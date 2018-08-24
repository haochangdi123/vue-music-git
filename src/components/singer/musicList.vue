<template>
  <div class="musicList">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <p class="name">{{singer.name}}</p>
    <div class="bg" :style="bgImg">
      <div class="wrapper">
         <div class="btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <scroll  class="main">
       <div>
          <ul>
            <li v-for="(item,index) in songList" :key="index" class="song">
              <h3 class="song-name">{{item.name}}</h3>
              <p class="song-album">{{item.singer}}~{{item.album}}</p>
            </li>
          </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/base/scroll/scroll';
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      }
    },
    singer: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
    };
  },
  components: {
    scroll
  },
  computed: {
    bgImg() {
      return `background-image:url(${this.singer.avatar})`;
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  created() {
    console.log(this.songList);
  }
};
</script>

<style lang="scss" scoped>
.musicList {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222;
  .back {
    position: absolute;
    left: 0;
    top: 6px;
    z-index: 50;
    .icon-back {
      padding: 10px;
      font-size: 22px;
      color: #ffcd32;
    }
  }
  .name {
     z-index: 50;
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  .bg {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;
    .wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .btn {
        width: 135px;
        margin: 0 auto;
        padding: 7px 0;
        box-sizing: border-box;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        text-align: center;
        .icon-play {
          display: inline-block;
          font-size: 16px;
          margin-right: 6px;
          vertical-align: middle;
        }
        .text {
          display: inline-table;
          font-size: 12px;
        }
      }
    }
  }
  .main {
    padding-top:10px;
    .song {
      padding: 10px;
      font-size: 16px;
      line-height: 20px;
      .song-album {
        color: rgba(255, 255, 255, 0.3);
        margin-top: 4px;
      }
    }
  }
}
</style>
