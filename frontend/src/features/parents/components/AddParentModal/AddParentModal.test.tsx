import '@testing-library/jest-dom'
import {AddParentModal} from '../AddParentModal/AddParentModal';
import { fireEvent, render } from "@testing-library/react"
const crypto = require('crypto');

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: arr => crypto.randomUUID
  }
});
function renderOpenModal(){
    render(<AddParentModal />);
    fireEvent.click(document.getElementsByTagName("button")[0]);
}
describe("AddParentModal", () => {

    it("renders button", () => {
        const component = render(<AddParentModal />);
        const button = component.getByRole("button")
        expect(button).toBeInTheDocument()
    })
    
    it("modal does not show initially", async () => {
        render(<AddParentModal />);
        expect(document.querySelector('form')).not.toBeInTheDocument()
    })

    it("modal opens and displays form on button click", () => {
        renderOpenModal();
        expect(document.querySelector('form')).toBeInTheDocument()
    })

    it("submit button is disabled by default", () => {
        renderOpenModal();
        const submitButton = document.querySelector('button[type="submit"]')
        expect(submitButton).toBeDisabled()
    })

    it("renders correct inputs", () => {
        renderOpenModal();
        const inputs = document.getElementsByTagName("input");
        expect(inputs.length).toBe(3)
        expect(inputs[0].name).toBe("firstNames")
        expect(inputs[1].name).toBe("lastName")
        expect(inputs[2].name).toBe("email")
    })

    it("handles text changes", () => {
        renderOpenModal();
        const inputs = document.getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++) {
            expect(inputs[i].value).toBe("");
            fireEvent.change(inputs[i], {target: {value: 'Testy'}})
            expect(inputs[i].value).toBe("Testy");
        }
    })

    it("requires valid email address", () => {
        renderOpenModal();
        const inputs = document.getElementsByTagName("input");
        for(let i = 0; i < inputs.length; i++) {
            expect(inputs[i].value).toBe("");
            fireEvent.change(inputs[i], {target: {value: 'Testy'}})
            expect(inputs[i].value).toBe("Testy");
        }
        const submitButton = document.querySelector('button[type="submit"]')
        expect(submitButton).toBeDisabled()

    })

})

