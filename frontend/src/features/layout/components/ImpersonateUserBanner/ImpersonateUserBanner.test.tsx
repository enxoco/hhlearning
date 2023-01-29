import '@testing-library/jest-dom';

import { act, render } from "@testing-library/react"
import { ImpersonateUserBanner } from './ImpersonateUserBanner';

describe("ImpersonateUserBanner", () => {
    Object.defineProperty(location, "href", {
        value: "example.com",
        writable: true
      });
    it("Renders with a name", () => {
        render(<ImpersonateUserBanner user={{ id: "0", name: "Mike Conrad" }} callback={() => window.location.href = "/dashboard" } />)
        expect(document.body.textContent).toContain("Mike Conrad")
    })

    it("Renders a link", () => {
        render(<ImpersonateUserBanner user={{ id: "0", name: "Mike Conrad" }} callback={() => window.location.href = "/dashboard" } />)
        expect(document.querySelector("a")).toBeInTheDocument()
    })

    it("Renders correctly passed in link", () => {
        render(<ImpersonateUserBanner user={{ id: "0", name: "Mike Conrad" }} callback={() => window.location.href = "/dashboard" } />)
        act(() => {
            const link = document.getElementsByTagName("a");
            link[0].click()
            expect(window.location.href).toBe("/dashboard")
        })
    })


})