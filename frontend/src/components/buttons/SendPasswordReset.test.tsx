import '@testing-library/jest-dom';

import { render, fireEvent } from "@testing-library/react"
import { act } from "react-test-renderer"
import { expect, vi } from 'vitest'
import { SendPasswordReset } from './SendPasswordReset';

test("calls handlePasswordReset when clicked", async () => {
    const component = render(<SendPasswordReset email="mikeconrad@onmail.com" />)
    const handlePasswordReset = vi.fn()
    expect(vi.isMockFunction(handlePasswordReset)).toBe(true)

    expect(component.getByRole("button")).toBeInTheDocument()
    act(async () => {
        await fireEvent.click(component.getByRole("button"))
    })
    expect(component).toMatchSnapshot()
    
})