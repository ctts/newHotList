// import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SearchInput from '../../src/views/components/SearchInput.vue'

describe('SearchInput.vue', () => {
  it('测试查看', () => {
    // const msg = 'new message'
    const wrapper = shallowMount(SearchInput)
    console.log(wrapper.vm)
    console.log()
    // expect(wrapper.text()).to.include(msg)
  })
})
