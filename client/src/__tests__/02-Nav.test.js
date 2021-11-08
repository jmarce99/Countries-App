import React from 'react'
import { Link } from 'react-router-dom'
import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import NavBar from '../components/nav/Nav.js'

configure({ adapter: new Adapter() })

describe('Nav', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavBar />)
  })
  test('Debe tener tres Links', () => {
    expect(wrapper.find(Link)).toHaveLength(3)
  })
  test('Deberia tener un link que redireccione la ruta hacia /', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/')
  })
  test('Deberia tener un link que redireccione la ruta hacia /countries', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/countries')
  })
  test('Deberia tener un link que redireccione la ruta hacia /addactivity', () => {
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/addactivity')
  })
})