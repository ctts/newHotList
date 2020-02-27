<template>
  <div id="app">
    <common-head></common-head>
    <router-view />
    <tabbar
      :tabs="tabs"
      class="tabbar"
      v-show="showTabbar"
    >
      <template #home>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-iconstar-copy"></use>
        </svg>
      </template>
      <template #_home>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-iconwujiaoxing_kong"></use>
        </svg>
      </template>
      <template #search>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-iconfaxian1"></use>
        </svg>
      </template>
      <template #_search>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-iconfaxian2"></use>
        </svg>
      </template>
      <template #person>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-icongerenzhongxin1"></use>
        </svg>
      </template>
      <template #_person>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#el-iconicon7"></use>
        </svg>
      </template>
    </tabbar>
  </div>
</template>

<script>
import commonHead from './components/CommonHead'
import tabbar from './components/Tabbar'
// import BScroll from 'better-scroll'
export default {
  name: 'app',
  data () {
    return {
      showTabbar: true,
      tabs: [
        {
          name: 'home',
          routerLink: '/',
          isActive: true
        },
        {
          name: 'search',
          routerLink: '/search',
        },
        {
          name: 'person',
          routerLink: '/person',
        },
      ]
    }
  },
  components: {
    commonHead,
    tabbar
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     scrollY: true,
    //     scrollX: false,
    //     mouseWheel: true,
    //     click: true,
    //     taps: true
    //   })
    // })
  },
  watch: {
    '$route': {
      handler () {
        this.showTabbar = this.$route.name !== 'Login'
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 4.9rem 0;
  max-width: 600px;
}

.icon {
  font-size: 2.5rem;
}

.tabbar {
  position: absolute;
}
</style>
