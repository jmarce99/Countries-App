import React from 'react'
import { Link } from 'react-router-dom'
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import Home from '../components/home/Home.js'

configure({ adapter: new Adapter() })

describe('Nav', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Home />)
  })
  test('Debe tener un Link', () => {
    expect(wrapper.find(Link)).toHaveLength(1)
  })
  test('Deberia tener un link que redireccione la ruta hacia /countries', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/countries')
  })
})