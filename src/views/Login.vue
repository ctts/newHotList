<template>
  <div class="container">
    <div class="head-img">
      <img src="../assets/images/R.png">
    </div>
    <el-form
      label-position="right"
      :model="userdata"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          v-model="userdata.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="userdata.password"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="success"
      plain
      @click="login"
    >登录 / 注册</el-button>
  </div>
</template>

<script>
import { loginTo } from '@/request/api'
export default {
  name: 'Login',
  data () {
    return {
      userdata: {
        username: '',
        password: '',
        userimg: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
          { min: 3, max: 11, message: '账号长度在3-11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '密码长度在3-11个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$store.amendType({
      type: 'setTitle',
      data: {
        title: '登录注册',
        showBack: true
      }
    })
  },
  methods: {
    login () {
      if (this.userdata.username.trim() === '' || this.userdata.password.trim() === '') {
        return
      }
      loginTo(this.userdata)
        .then(res => {
          if (res.data.result.status === 0) {
            console.log('密码错误或帐号已被注册')
            // this.$toast.bottom('密码错误或帐号已被注册')
          } else {
            // console.log(res)
            this.$store.setUserInfo({
              username: this.userdata.username,
              userimg: res.data.result.userimg,
              token: res.data.token
            })
            this.$store.amendType({
              type: 'isLogin',
              data: true
            })
            this.$router.replace({ name: 'PersonCenter' })
          }
        })
        .catch(err => {
          console.log(err)
          // this.$toast.bottom('网络连接失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.head-img {
  img{
    object-fit: contain;
  }
  width: 10rem;
  height: 10rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-form-item {
  margin: 2rem 0;
}
.el-input,
.el-button {
  width: 20rem;
}
</style>