<template>
  <div class="container">
    <div
      class="back"
      v-show="state.showBack"
      @click="back()"
    >
      <img
        src="../assets/images/back.png"
        alt="back"
      >
    </div>
    <div class="title">
      {{state.title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonHead',
  data () {
    return {
      state: {
        title: '',
        showBack: false
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  watch: {
    '$route': {
      handler () {
        this.state = this.$store.state.curTitle
        // console.log(this.state)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  display: flex;
  background: #409eff;
  color: #fff;
  width: 100%;
  max-width: 600px;
  height: 5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 999;

  .title {
    font-size: 1.6rem;
  }
  .back {
    position: absolute;
    left: 0;
    width: 4rem;
    img {
      max-width: 2rem;
    }
  }
}
</style>
