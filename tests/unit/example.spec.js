import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Login from '../../src/views/Login.vue'
import '@/plugins/element.js'
import '@/store/index.js'

describe('Login.vue', () => {
  it('测试查看', () => {
    // const msg = 'new message'
    const wrapper = mount(Login, {
      data(){
        return{
          userdata: {
            username: 'test',
            password: '123456',
            userimg: ''
          },
        }
      }
    })
    setTimeout(() => {
      console.log(wrapper.vm.isSuccess)
      expect(wrapper.vm.isSuccess).toBe(false)
    }, 2000);
  })
})
