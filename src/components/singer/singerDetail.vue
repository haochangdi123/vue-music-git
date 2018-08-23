<template>
  <transition name="slide">
    <div class="singerDetail">
      <music-list></music-list>
    </div>
  </transition>
</template>

<script>
import musicList from './musicList';
import {getSingerList} from '@/api/singerDetail';
import {createSong} from '@/common/js/song';
const ERR_NO = '0';
export default {
  data() {
    return {
      singerDetail: []
    };
  },
  components: {
    musicList
  },
  methods: {
    _getSingerList() {
      getSingerList(this.$route.params.id).then((res) => {
        if (res.code === ERR_NO);
        this.singerDetail = this._nomalize(res.data.list);
        console.log(this.singerDetail);
      });
    },
    _nomalize(list) {
      let res = [];
      list.forEach(element => {
        let {musicData} = element;
        res.push(createSong(musicData));
      });
      return res;
    }
  },
  created() {
    this._getSingerList();
  }
};
</script>

<style lang="scss" scoped>
.singerDetail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222;
}
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
