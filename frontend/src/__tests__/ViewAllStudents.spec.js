import ComponentTestWrapper from '../ComponentTestWrapper'
import Students from '../pages/Students'
import {render, screen} from '@testing-library/react'
import UrqlProvider from '../utils/urqlClient'
it('renders without crashing', () => {
    
    render(<UrqlProvider><ComponentTestWrapper component={<Students />} location='/students' /></UrqlProvider>)
    expect(screen.getByText('Add Student')).toBeInTheDocument()
})