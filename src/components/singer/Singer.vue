<template>
  <div class="singer">
    <list-view :singerList="list" v-if="list.length>0" @selectFn="selectFn"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from '@/api/singer';
import Singer from '@/common/js/singer';
import listView from './listview';
import {mapMutations} from 'vuex';
const ERR_NO = 0;
const HOT = '热门';
const HOT_SINGER_LENGTH = 10;
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    listView
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_NO) {
          this.list = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger(list) {
      // console.log(list);
      let map = {
        hot: {
          title: HOT,
          items: []
        }
      };
      list.forEach((ele, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: ele.Fsinger_id,
            name: ele.Fsinger_name,
            mid: ele.Fsinger_mid
          }));
        }

        let key = ele.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer({
          id: ele.Fsinger_id,
          name: ele.Fsinger_name,
          mid: ele.Fsinger_mid
        }));
      });
      // 将a-z以及hot排序
      let h = [];
      let r = [];
      for (let k in map) {
        let val = map[k];
        if (val.title.match(/[a-zA-Z]/)) {
          r.push(val);
        } else if (val.title === HOT) {
          h.push(val);
        }
      }
      r.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return h.concat(r);
    },
    // 跳到歌手详情
    selectFn(item) {
      this.setSinger(item);
      this.$router.push({
        path: `/singer/${item.mid}`
      });
    },
    // 设置vuex
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  created() {
    this._getSingerList();
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 73px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
