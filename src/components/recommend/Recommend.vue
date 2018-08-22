<template>
  <scroll class="recommend">
    <div>
      <slide-img :list="slideList" v-if="slideList.length"></slide-img>
      <h2 class="title">热门歌单推荐</h2>
      <div class="mian">
        <ul>
          <li class="list" v-for="(item,index) in list" :key="index">
            <div class="avatar">
              <img v-lazy="item.imgurl" alt="">
            </div>
            <div class="message">
              <h2 class="name">{{item.creator.name}}</h2>
              <p class="dissname">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <loading v-if="!list.length>0"></loading>
  </scroll>
</template>

<script>
import {getRecommendList, getSlideList} from '@/api/recommend.js';
import scroll from '@/base/scroll/scroll';
import SlideImg from './SlideImg';
import loading from '@/base/loading/loading';
const ERR_NO = 0;
export default {
  data() {
    return {
      slideList: [],
      list: []
    };
  },
  components: {
    scroll,
    SlideImg,
    loading
  },
  methods: {
    _getRecommendList() {
      getRecommendList().then((res) => {
        if (res.code === ERR_NO) {
          this.list = res.data.list;
        }
      });
    },
    _getSlideList() {
      getSlideList().then((res) => {
        if (res.code === ERR_NO) {
          this.slideList = res.data.slider;
        }
      });
    }
  },
  created() {
    this._getRecommendList();
    this._getSlideList();
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 73px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .title {
    height: 52px;
    line-height: 52px;
    font-size: 12px;
    color: #ffcd32;
    text-align: center;
  }
  .mian {
    .list {
      display: flex;
      padding: 20px;
      padding-top: 0;
      &:last-child {
        padding-bottom: 0;
      }
      .avatar {
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .message {
        flex: 1;
        margin-left: 16px;
        font-size: 12px;
        line-height: 25px;
        .dissname {
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
}
</style>
