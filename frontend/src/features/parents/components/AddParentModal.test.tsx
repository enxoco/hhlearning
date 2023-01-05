import '@testing-library/jest-dom'
import AddParentModal from './AddParentModal';
import { render } from "@testing-library/react"

test("renders Add Parents button", async () => {
    const component = render(<AddParentModal />)
    const button = component.queryByText("Add Parents");
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe("BUTTON")
    

})
