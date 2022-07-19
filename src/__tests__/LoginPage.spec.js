import React from 'react'
import {render, screen} from '@testing-library/react'
import ComponentTestWrapper from '../ComponentTestWrapper'
import Login from '../pages/Login'

it('renders without crashing', () => {
    render(<ComponentTestWrapper component={<Login />} location='/login' />)
})