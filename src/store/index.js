var store = {
  data: {
    type: {
      isLogin: false,
    },
    userInfo: {
      username: '',
      userimg: '',
      token: ''
    },
    curTitle: {
      title: '',
      showBack: false
    }
  },
  get state() {
    return this.data
  },
  set state(val) {
    window.localStorage.setItem('store', JSON.stringify(this.data))
  },
  amendType(obj) {
    let state = this.data
    switch (obj.type) {
      case 'isLogin':
        state.type.isLogin = obj.data
        break
      case 'setTitle':
        state.curTitle = obj.data
        break
      default:
        break
    }
    this.state = state
  },
  // 设置个人信息
  setUserInfo(obj) {
    console.log(obj);
    if (obj.userimg) {
      let http = new RegExp('http').test(obj.userimg)
      if (!http) {
        obj.userimg = process.env.VUE_APP_PATH + 'static/userHead/' + obj.userimg
      }
    }
    let state = this.data
    state.userInfo = obj
    this.state = state
  },
  synchronousData(obj) {
    this.data = obj
  }
}

if (window.localStorage.getItem('store')) {
  store.synchronousData(JSON.parse(window.localStorage.getItem('store')))
}
export default store