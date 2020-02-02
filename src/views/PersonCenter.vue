<template>
  <div>
    <user-head></user-head>
    <!-- 历史记录 -->
    <div class="history">
      <div class="title">浏览历史</div>
      <div class="history-list">
        <a
          class="history-item"
          v-for="item of historyList"
          :key="item._id"
          :href="item.infoURL"
        >
          <img
            :src="getPath(item.weblogo)"
            class="logo"
          >
          <div class="infoContent">{{item.infoContent}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from './components/UserHead'
import { getHistory } from '../request/api'
export default {
  name: 'PersonCenter',
  data () {
    return {
      historyList: []
    }
  },
  components: {
    UserHead
  },
  methods: {
    getPath (name) {
      return this.$root.ImagePath + name
    }
  },
  created () {
    if (this.$store.state.type.isLogin) {
      getHistory(this.$store.state.userInfo.username).then(val => {
        console.log(val)
        if (val.data.length === 0) {
          console.log('还没有记录')
        } else {
          this.historyList = val.data.info
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  display: flex;
  flex-direction: column;
  padding: 0.8rem;

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 0.8rem;
  }
}

.history-list {
  padding: 0.8rem;
  .history-item {
    display: flex;
    align-items: center;
    height: 6rem;
    text-decoration: none;
    font-size: 1.3rem;
    color: inherit;
    img {
      max-width: 4rem;
      max-height: 4rem;
      margin-right: 1rem;
    }
  }
}
</style>

