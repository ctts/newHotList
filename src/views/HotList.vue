<template>
  <div>
    <header>
      <div class="userimg">
        <img
          :src="getPath(this.webdata.weblogo)"
          :alt="this.webdata.weblocalname"
        >
      </div>
      <div @click="changeSubscription">
        <el-button
          type="danger"
          v-if="isSubscript"
        >取消订阅</el-button>
        <el-button
          type="success"
          v-else
        >订阅</el-button>
      </div>
    </header>
    <div class="hotlist">
      <a
        class="list-item"
        v-for="item of hotlist"
        :key="item._id"
        @click="handlePostHistory(item)"
        :href="item.infoURL"
        target="_blank"
      >
        <div class="number">{{getNumber(item.infoNumber)}}</div>
        <div class="content">{{item.infoContent}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { getHotData, addSubscription, isSubscription, postHistory } from '../request/api'
export default {
  name: 'hotList',
  data () {
    return {
      hotlist: [],
      webdata: {},
      username: '',
      isSubscript: false
    }
  },
  created () {
    this.webdata = this.$route.params
    this.getHotList()
    this.initHead()
    if (this.$store.state.type.isLogin) {
      this.username = this.$store.state.userInfo.username
      isSubscription(this.username, this.webdata.webname).then(res => {
        this.isSubscript = res.data
      })
    }
  },
  methods: {
    // 添加历史记录
    handlePostHistory (item) {
      item.username = this.username
      console.log(item)
      postHistory(item)
    },
    // 判断是否订阅
    changeSubscription () {
      // 先判断是否登录，若没登录则前往登录页面
      if (!this.$store.state.type.isLogin) {
        this.$router.push({ name: 'Login' })
        return
      }
      let userdata = {
        username: this.username,
        webname: this.webdata.webname,
        type: this.isSubscript
      }
      addSubscription(userdata).then(res => {
        console.log(res);
        this.isSubscript = !this.isSubscript
      })
    },
    // 初始化header
    initHead () {
      this.$store.amendType({
        type: 'setTitle',
        data: {
          title: this.webdata.weblocalname,
          showBack: true,
        }
      })
    },
    getNumber (id) {
      let number = id < 10 ? '0' + id : id
      return number + '.'
    },
    // 获取数据
    getHotList () {
      getHotData(this.webdata.webname).then(res => {
        this.hotlist = res.data.sort((a, b) => a.infoNumber - b.infoNumber)
      })
    },
    // 取得图片路径
    getPath (name) {
      return this.$root.ImagePath + name
    }
  }
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 18rem;
  background: #eeeeee;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .userimg {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: #ffffff;
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
    }
  }
  .el-button {
    width: 10rem;
  }
}

.hotlist {
  padding: 1.6rem;
  .list-item {
    display: flex;
    align-items: center;
    height: 4rem;
    text-decoration: none;
    color: inherit;
    font-size: 2rem;

    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .number {
    margin-right: 1rem;
  }
}
</style>
