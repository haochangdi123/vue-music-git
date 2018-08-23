<template>
  <scroll class="listview" :probeType="3" :listenScroll="true" @scrollFn="scrollFn" ref="scr">
    <div>
      <ul>
        <li class="arr" v-for="(itemes, index) of singerList" :key="index" ref="listGrop">
          <h3 class="title">{{itemes.title}}</h3>
          <ul>
            <li class="singer" v-for="(item, index) of itemes.items" :key="index" @click="select(item)">
              <div class="avatar">
                <img v-lazy="item.avatar">
              </div>
              <p class="name">{{item.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="toptitle" v-show="fixedTitle" ref="fixed">
      <h3 class="title">{{fixedTitle}}</h3>
    </div>
    <div class="a-z" @touchstart="touchStart" @touchmove="touchMove">
      <ul>
        <li v-for="(item, index) in singerTitleList" :key="index" class="title" :class="{active:currentIndex === index}" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <loading v-if="!singerList.length"></loading>
  </scroll>
</template>

<script>
import scroll from '@/base/scroll/scroll';
import {getData} from '@/common/js/dom';
import loading from '@/base/loading/loading';
const HEIGHT = 18;
const TITLE_HEIGHT = 20; // 每一个title的高度
export default {
  props: {
    singerList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      listHeight: [], // 存放区间高度
      scrollY: 0,
      currentIndex: 0, // 当前a-z表的所在index(高亮)
      diff: 0
    };
  },
  components: {
    scroll,
    loading
  },
  computed: {
    // 整理a-z显示的文字
    singerTitleList() {
      return this.singerList.map((item) => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.singerList[this.currentIndex].title ? this.singerList[this.currentIndex].title : '';
    }
  },
  watch: {
    scrollY(newy) {
      if (newy > 0) {
        this.currentIndex = 0;
        return;
      }
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];
        if (h1 <= (-newy) && (-newy) < h2) {
          this.currentIndex = i;
          this.diff = h2 + newy;
        }
      }
    },
    diff(newV) {
      let fiexdTop = (newV < TITLE_HEIGHT && newV > 0) ? newV - TITLE_HEIGHT : 0;
      if (this.fiexdTop === fiexdTop) {
        return;
      }
      this.fiexdTop = fiexdTop;
      this.$refs.fixed.style.transform = `translate3d(0, ${fiexdTop}px, 0)`;
    }
  },
  methods: {
    // 计算每一种歌手的高度区间
    _heightRange() {
      const list = this.$refs.listGrop;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    scrollFn(pro) {
      this.scrollY = pro.y;
    },
    touchStart(event) {
      let anInidex = getData(event.target, 'index');
      this.scrollTo(anInidex);
      this.touch.init = true;
      this.touchStartY = event.touches[0].pageY;
      this.touch.anInidex = anInidex;
    },
    touchMove(event) {
      let h = event.touches[0].pageY;
      let offsetY = parseInt((h - this.touchStartY) / HEIGHT || 0);
      let index = parseInt(this.touch.anInidex) + offsetY;
      this.scrollTo(index);
    },
    scrollTo(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.scr.scrollToElement(this.$refs.listGrop[index], 0);
    },
    select(item) {
      this.$emit('selectFn', item);
    }
  },
  created() {
    setTimeout(() => {
      this._heightRange();
    }, 20);
    this.touch = {};
  }
};
</script>

<style lang="scss" scoped>
.listview {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #222;
  .arr {
    padding-bottom: 30px;
    .title {
      height: 30px;
      padding-left: 12px;
      line-height: 30px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
    }
    .singer {
      display: flex;
      padding: 20px 0 0 30px;
      .avatar {
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .name {
        margin-left: 12px;
        line-height: 50px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }
    }
  }
  .a-z {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    .title {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 1;
      padding: 3px;
      &.active {
        color: #ffcd32;
      }
    }
  }
  .toptitle {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 30px;
    padding-left: 12px;
    line-height: 30px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: #333;
  }
}
</style>
