<template>
  <transition name="slide">
    <div class="singerDetail">
      <music-list :songList="singerDetail" :singer="singer" v-if="singer&&singerDetail.length"></music-list>
    </div>
  </transition>
</template>

<script>
import musicList from './musicList';
import {getSingerList} from '@/api/singerDetail';
import {createSong} from '@/common/js/song';
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getSingerList() {
      if (!this.singer.mid) {
        this.$router.push('/singer');
      } else {
        getSingerList(this.singer.mid).then((res) => {
          if (res.code === ERR_NO);
          this.singerDetail = this._nomalize(res.data.list);
        });
      }
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
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
