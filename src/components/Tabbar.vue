<template>
  <div
    class="contaienr"
    :style="`height:${ct_height};background:${ct_background};padding:${ct_padding_column} 0;font-size:${fontSize}`"
  >
    <div
      class="tab-item"
      v-for="(tab,index) of t_tabs"
      :key="'tab'+index"
      @click="changeState(tab.name);linkTo(tab.routerLink)"
    >
      <transition
        :name="zoom"
        mode="out-in"
      >
        <div
          v-if="tab.active"
          key="active"
        >
          <slot :name="tab.name"></slot>
        </div>
        <div
          v-else
          key="inactive"
        >
          <slot :name="'_'+ tab.name"></slot>
        </div>
      </transition>
      <div class="tab-text">{{tab.text}}</div>
      <div
        class="ripple-wapper"
        v-if="showRipple"
      >
        <vue-long-ripple></vue-long-ripple>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabbar',
  props: {
    tabs: Array,
    // 垂直padding
    ct_padding_column: {
      type: String,
      default: '0'
    },
    // 高度
    ct_height: {
      type: String,
      default: '49px'
    },
    // 背景色
    ct_background: {
      type: String,
      default: '#f4f4f4'
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '12px'
    },
    // 默认开启
    defaultActive: {
      type: String
    },
    showRipple: {
      type: Boolean,
      default: true
    },
    showZoom: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      t_tabs: JSON.parse(JSON.stringify(this.tabs)),
      zoom: 'zoom'
    }
  },
  mounted () {
    // 是否缩放
    if (!this.showZoom) {
      this.zoom = ''
    }
    // 设置默认active
    this.t_tabs.forEach(tab => {
      if (tab.active) {
        this.changeState(tab.name)
      }
    })
    // 优先判断当前路由是否和routerlink的值相同
    if (this.$route.name) {
      let name = this.$route.path
      for (let obj of this.tabs) {
        if (obj.routerLink === name) {
          this.changeState(obj.name)
        }
      }
    }
  },
  methods: {
    // 状态改变事件
    changeState (tabName) {
      this.t_tabs.forEach((tab, index) => {
        tab.active = tab.name === tabName
        this.$set(this.t_tabs, index, tab)
      })
    },
    // 路由跳转
    linkTo (link) {
      if (link || link === '') {
        link = link.search(/^\//) !== 0 ? '/' + link : link
        if (this.$route.path === link) {
          // 可以在此处添加回调
          return
        } else {
          this.$router.push(link)
        }
      } else {
        this.$router.replace('/')
      }
    },
  }
}
</script>

<style lang="less" scoped>
.center(@direction:row) {
  display: flex;
  flex-flow: @direction nowrap;
  justify-content: center;
  align-content: center;
}

.contaienr {
  text-align: center;
  position: relative;
  z-index: 999;
  max-width: 600px;

  .center(row);
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab-item {
  position: relative;
  .center(column);
  flex: 1;
  .tab-text {
    margin-top: 2px;
  }

  .ripple-wapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .zoom-enter-active {
    animation: zoom-in 0.4s;
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0);
    }

    60% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
