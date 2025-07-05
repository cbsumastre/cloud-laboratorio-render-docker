import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ToDoView from './ToDoView.vue'

describe('TodoView specs', () => {
  it('should contain the text ToDo App in the heading', () => {
    //Arrange

    //Act

    const wrapper = mount(ToDoView, {
      global: {
        plugins: [createTestingPinia({})],
      },
    })

    //Assert
    expect(wrapper.find('h1').text()).toContain('ToDo App')
  })
})
