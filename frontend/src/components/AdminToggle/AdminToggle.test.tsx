import '@testing-library/jest-dom';

import { act, render, screen } from "@testing-library/react"
// import { AdminToggle } from './AdminToggle';
import { composeStories } from '@storybook/testing-react';
import * as stories from './AdminToggle.stories'; // import all stories from the stories file
const { ToggledOn, ToggledOff } = composeStories(stories);

describe("AdminToggle", () => {

    it("renders two buttons", () => {
        render(<ToggledOff />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons.length).toBe(2)
    })

    it("renders yes and no buttons", () => {
        render(<ToggledOff />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].textContent).toBe("Yes");
        expect(buttons[1].textContent).toBe("No");
    })

    it("renders correct for admin user", () => {
        render(<ToggledOn />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].dataset["active"]).toBeDefined();
        expect(buttons[1].dataset["active"]).not.toBeDefined();
    })

    it("renders correct for non admin user", () => {
        render(<ToggledOff />)
        const buttons = document.getElementsByTagName("button");
        expect(buttons[0].textContent).toBe("Yes")
        expect(buttons[0].dataset["active"]).not.toBeDefined()
        expect(buttons[1].textContent).toBe("No")
        expect(buttons[1].dataset["active"]).toBeDefined()
    })

})