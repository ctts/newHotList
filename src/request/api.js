import axios from './http'

// 登录
const loginTo = (userdata) => {
    return axios.post('/login', userdata)
}

// 获取热点数据
const getHotData = web => {
    return axios.get('/website/' + web)
}

// 上传用户头像
const postUserImage = (formdata, config) => {
    return axios.post('/upload', formdata, config)
}

// 上传历史记录
const postHistory = history => {
    return axios.post('/history/insertHistory', history)
}

// 获取历史记录
const getHistory = username => {
    return axios.get('/history/getHistory/' + username)
}

// 更新订阅
const addSubscription = userdata => {
    return axios.post('/subscription/update', userdata)
}

// 获取所有网站
const getAllWeb = (username = '') => {
    return axios.get('/allweb/' + username)
}

// 获取所有热点
const getAllHot = () => {
    return axios.get('/alldata')
}

// 获取用户订阅的热点
const getUserPrefer = username => {
    return axios.get('/getUserPrefer/' + username)
}

// 获取用户订阅的站点
const getUserPreferWeb = username => {
    return axios.get('/preferenceWeb/' + username)
}

// 查询网站是否订阅
const isSubscription = (username, webname) => {
    return axios.get(`/isSubscription/${username}/${webname}`)
}

export {
    loginTo,
    getHotData,
    postUserImage,
    postHistory,
    getHistory,
    addSubscription,
    getAllWeb,
    getAllHot,
    getUserPrefer,
    isSubscription,
    getUserPreferWeb
}