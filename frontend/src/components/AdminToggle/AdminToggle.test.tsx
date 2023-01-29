import '@testing-library/jest-dom';

import { act, render } from "@testing-library/react"
import { AdminToggle } from './AdminToggle';

describe("AdminToggle", () => {
    let user = {
        id: "0",
        isAdmin: true
    }
    it("renders two buttons", () => {
        render(<AdminToggle {...user} />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons.length).toBe(2)
    })

    it("renders yes and no buttons", () => {
        render(<AdminToggle {...user} />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].textContent).toBe("Yes");
        expect(buttons[1].textContent).toBe("No");
    })

    it("renders correct for admin user", () => {
        render(<AdminToggle {...user} />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].dataset["active"]).toBeDefined();
        expect(buttons[1].dataset["active"]).not.toBeDefined();
    })

    it("renders correct for non admin user", () => {
        user.isAdmin = false
        render(<AdminToggle {...user} />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].dataset["active"]).not.toBeDefined()
        expect(buttons[1].dataset["active"]).toBeDefined()
    })
})