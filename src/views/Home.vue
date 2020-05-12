<template>
  <div class="container">
    <div
      class="hotlist"
      v-for="(data,index) of obj2arr(allData)"
      :key="'data'+index"
    >
      <div class="head-name">{{titles[index]}}</div>
      <div class="item-container">
        <router-link
          class="item"
          v-for="item of data"
          :key="item.id"
          :to="{name:'HotList',params:item}"
        >
          <img
            :src="getPath(item.weblogo)"
            alt="logo"
          >
          <div class="text">{{item.weblocalname}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllWeb, getUserPreferWeb } from '../request/api'
export default {
  name: 'home',
  data () {
    return {
      titles: ['我的榜单', '热门榜单', '其他榜单'],
      allData: {
        mineList: [],
        hotlist: [],
        otherList: [],
      }
    }
  },
  created () {
    this.setTitle()
    this.getAllData()

  },
  methods: {
    setTitle () {
      this.$store.amendType({
        type: 'setTitle',
        data: {
          title: '所有网站',
          showBack: false
        }
      })
    },
    // 获取所有列表
    async getAllData () {
      let initdata = this.$store.state
      let prefer = []
      if (initdata.type.isLogin) {
        // 获取用户订阅
        await getUserPreferWeb(initdata.userInfo.username).then(val => {
          if (val.data) {
            prefer = val.data.webs
          } else {
            return
          }
        })
      }
      // 获取所有数据
      let all = await getAllWeb(initdata.userInfo.username)
      all.data.forEach((val) => {
        for (let obj of prefer) {
          // 将订阅的web放入minelist
          if (obj === val.webname) {
            this.allData.mineList.push(val)
          }
        }
      })
      this.classify(all.data)
    },
    getPath (name) {
      return this.$root.ImagePath + name
    },
    // 将网站分类
    classify (data) {
      data.forEach(val => {
        if (val.tag === 'hot') {
          this.allData.hotlist.push(val)
        } else {
          this.allData.otherList.push(val)
        }
      })
    },
    obj2arr (obj) {
      return Object.keys(obj).map(val => {
        return obj[val]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.hotlist {
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  border-bottom: 6px solid #f6f6f6;

  &:last-child {
    border-bottom: none;
  }
  .head-name {
    align-self: flex-start;
    height: 3rem;
    line-height: 2.5rem;
    font-size: 1.5rem;
  }
  .item-container {
    display: flex;
    flex-wrap: wrap;

    .item {
      flex: 0 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      text-decoration: none;
      color: inherit;
    }
    img {
      width: 6rem;
      height: 6rem;
    }
    .text {
      font-size: 1.4rem;
      font-weight: 400;
      margin: 1rem 0;
    }
  }
}
</style>
