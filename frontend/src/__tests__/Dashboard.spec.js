import React from 'react'
import {render, screen} from '@testing-library/react'

import ComponentTestWrapper from '../ComponentTestWrapper'
import Dashboard from '../pages/Dashboard'

it('renders without crashing', () => {
    render(<ComponentTestWrapper component={<Dashboard />} location="/dashboard" />)
})