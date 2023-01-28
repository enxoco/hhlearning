import { User } from '#/generated/graphql';
import '@testing-library/jest-dom';

import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { SidebarShell } from "./SidebarShell";

describe("SidebareShell Logged Out", () => {
    it("renders an empty sidebar layout with logo", async () => {
        const component = render(<SidebarShell children={<></>} path="/" />, { wrapper: BrowserRouter })
        const logo = document.querySelectorAll("img")
        expect(logo.length).toBe(1)
        const logoutButton = document.querySelector("button")
        expect(document.querySelector("button")).not.toBeInTheDocument()
    })

    it("Does not show a user profile badge", async () => {
        const component = render(<SidebarShell children={<></>} path="/" />, { wrapper: BrowserRouter })
        const badge = component.queryByTestId("userProfileBadge")
        expect(badge).not.toBeInTheDocument()
    })
})

describe("SidebarShell Logged In", () => {
    const testUser: User = {
        id: "0",
        email: "test@example.com",
        name: "Testy McTesterson"
    }

    it("renders a logout button", () => {
        render(<SidebarShell children={<></>} user={testUser} path="/" />, { wrapper: BrowserRouter })
        const logoutButton = document.querySelector("button")
        expect(logoutButton).toBeInTheDocument()
        expect(logoutButton).toHaveTextContent("Logout")
    })

    it("renders initialsAvatar component", () => {
        const component = render(<SidebarShell children={<></>} user={testUser} path="/" />, { wrapper: BrowserRouter })
        const badge = component.getByTestId("userProfileBadge")
        expect(badge).toBeInTheDocument()
    })

    it("does not render user profile badge if showBadge prop is fales", () => {
        const component = render(<SidebarShell children={<></>} showBadge={false} user={testUser} path="/" />, { wrapper: BrowserRouter })
        // We need to use queryAllBy if we are not sure if this element is on the page or not.
        const badge = component.queryAllByTestId("userProfileBadge")
        expect(badge.length).toBe(0)
    })
})