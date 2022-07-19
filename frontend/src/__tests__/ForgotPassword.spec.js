import React from 'react'
import ComponentTestWrapper from '../ComponentTestWrapper'
import ForgotPassword from '../pages/auth/ForgotPassword'
import {render, screen} from '@testing-library/react'

it('renders without crashing', () => {
    render(<ComponentTestWrapper component={<ForgotPassword />} location='/forgot-password' />)
})