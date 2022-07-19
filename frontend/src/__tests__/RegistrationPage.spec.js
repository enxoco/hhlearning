import React from 'react'
import {render, screen} from '@testing-library/react'
import ComponentTestWrapper from '../ComponentTestWrapper'
import Register from '../pages/Register'
it('renders without crashing', () => {
    render(<ComponentTestWrapper component={<Register />} location='/Register' />)
})