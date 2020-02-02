<template>
  <div class="self-container">
    <!-- 上传头像模块 -->
    <el-upload
      class="avatar-uploader"
      action=""
      accept="image/gif, image/jpeg, image/png"
      ref="upload"
      :limit="1"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :auto-upload="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="myUpload"
    >
      <img
        v-if="userimg"
        :src="userimg"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
    <!-- 个人信息 -->
    <div class="info">
      <div
        v-if="loaded"
        class="username"
      >
        {{username}}
      </div>
      <div v-else>
        前往注册/登录
      </div>
      <div>
        <el-button
          type="danger"
          v-if="loaded"
          @click="safeOut"
        >安全退出</el-button>
        <el-button
          type="success"
          v-else
          @click="goToLogin"
        >前往注册/登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postUserImage } from '../../request/api'
export default {
  name: 'self',
  data () {
    return {
      loaded: false,
      userimg: '',
      username: ''
    }
  },
  created () {
    // 页面信息初始化
    let data = this.$store.state
    this.$store.amendType({
      type: 'setTitle',
      data: {
        title: '个人中心',
        showBack: false
      }
    })
    // 判断是否登录
    this.loaded = data.type.isLogin
    if (this.loaded) {
      this.userimg = data.userInfo.userimg
      this.username = data.userInfo.username
    }
  },
  methods: {
    goToLogin () {
      this.$router.push({
        name: 'Login'
      })
    },
    safeOut () {
      this.loaded = false
      // 修改状态
      this.$store.amendType({
        type: 'isLogin',
        data: false
      })
      // 清空用户数据
      this.$store.setUserInfo({})
      this.$router.replace({ 'name': 'Login' })
    },
    // 警告
    handleExceed () {
      alert('只能上传一张图片！')
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.userimg = URL.createObjectURL(file.raw)
    },
    // 图片上传
    myUpload (content) {
      // 清空内容，用于下次修改头像
      this.$refs.upload.clearFiles()
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      let formdata = new FormData()
      formdata.append('username', this.username)
      formdata.append('userimg', content.file)
      postUserImage(formdata, config)
        .then(res => {
          // 完成后，设置头像图片
          this.userimg = this.$root.userPath + res.data.userimg
          // console.log(res)
        })
    },
    // 图片校验
    beforeAvatarUpload (file) {
      if (!this.loaded) {
        alert('设置头像请先登录/注册！')
        return false
      }
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        alert('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt3M) {
        alert('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    }
  }
}
</script>

<style lang="less" scoped>
@size: 10rem;
.self-container {
  display: flex;
  padding: 0.5rem;
  background: #eeeeee;
}

.info {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

img {
  width: @size;
  height: @size;
  border-radius: 5px;
}

.el-button {
  width: 16rem;
}

/* 上传头像 */
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: @size;
  height: @size;
  line-height: @size;
  text-align: center;
}
.avatar {
  width: @size;
  height: @size;
  display: block;
  margin-left: 0.8rem;
}

.username {
  font-size: 1.6rem;
}

.el-message {
  height: 100px !important;
}
</style>
