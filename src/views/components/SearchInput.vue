<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="logs"
      :fetch-suggestions="querySearch"
      placeholder="请输入您要搜索的今日热点"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
      <i
        slot="prefix"
        class="el-input__icon el-icon-search"
      ></i>
    </el-autocomplete>
  </div>
</template>

<script>
import { getAllHot } from '../../request/api'
// import { mediaQueries } from '../../assets/javascript/common'
export default {
  name: 'search',
  data () {
    return {
      logs: '',
      resultData: []
    }
  },
  mounted () {
    getAllHot().then(res => {
      this.resultData = res.data
    }).catch(err => console.log(err))
  },
  methods: {
    querySearch (queryString, callback) {
      let resultData = this.resultData
      let result = queryString ? resultData.filter(this.createFilter(queryString)) : resultData
      callback(result)
    },
    createFilter (queryString) {
      return restaurant => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect (item) {
      // 打开链接
      window.open(item.infoURL)
      // if (mediaQueries()) {
      //   window.open(item.infoURL)
      // } else {
      //   // 手机端适配
      //   /* eslint-disable */
      //   var embed = plus.webview.create(item.infoURL, '', { top: '49px', bottom: '49px' });
      //   plus.webview.currentWebview().append(embed);
      // }
    }
  }
}
</script>

<style>
.inline-input {
  width: 100%;
  padding: 0.8rem;
}
</style>
