<template>
  <div class="container">
    <search-input></search-input>
    <div class="hot-today">
      <header>我的关注</header>
      <div
        class="hot-item"
        v-for="(item,index) of hotList"
        :key="'item'+index"
      >
        <div class="title">{{item.web.weblocalname}}</div>
        <div
          class="hot-content"
          v-for="hotdata of item.hotdata"
          :key="hotdata._id"
          @click="handleClick(hotdata)"
        >
          <img :src="getPath(item.web.weblogo)">
          <div class="text">
            {{hotdata.infoContent}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput'
import { getUserPrefer } from '../request/api'
export default {
  name: 'search',
  components: {
    SearchInput
  },
  data () {
    return {
      hotList: []
    }
  },
  created () {
    this.$store.amendType({
      type: 'setTitle',
      data: {
        title: '热点查询',
        showBack: false
      }
    })
    this.handleGetUserPrefer()
  },
  methods: {
    // 取得图片路径
    getPath (name) {
      return this.$root.ImagePath + name
    },
    handleGetUserPrefer () {
      if (this.$store.state.type.isLogin) {
        getUserPrefer(this.$store.state.userInfo.username).then(res => {
          res.data.forEach(val => {
            let data = {}
            let web = val.pop()
            data = {
              web,
              hotdata: val
            }
            this.hotList.push(data)
          });
        })
      }
    },
    handleClick (hotdata) {
      window.open(hotdata.infoURL)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 0.8rem 0;
}

.hot-today {
  margin-top: 2rem;

  header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 0.8rem;
  }
}

.hot-item {
  padding: 1rem;
  border-bottom: 3px solid #eeeeee;

  &:last-child {
    border-bottom: none;
  }
  
  img {
    max-width: 4rem;
    margin-right: 1rem;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  .hot-content {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 0 0;

    .text {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
