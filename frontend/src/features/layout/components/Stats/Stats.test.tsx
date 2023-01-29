import '@testing-library/jest-dom';

import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react"
import { Stats } from "./Stats";

let stats = [
    { label: "Stat 1", value: "1" },
    { label: "Stat 2", value: "2" },
    { label: "Stat 3", value: "3" },
]
describe("Stats", () => {
    it("renders correct number of stats", () => {
        const component = render(
            <ChakraProvider>
                <Stats stats={stats} />
            </ChakraProvider>
        )
        const statsDivs = component.getAllByTestId("statWrapper")
        expect (statsDivs.length).toBe(stats.length)
    })

    it("renders stats in correct order", () => {
        const component = render(
            <ChakraProvider>
                <Stats stats={stats} />
            </ChakraProvider>
        )
        const statsDivs = component.getAllByTestId("statWrapper")
        expect (statsDivs[0].textContent).toContain(stats[0].label)
        expect (statsDivs[1].textContent).toContain(stats[1].label)
        expect (statsDivs[2].textContent).toContain(stats[2].label)
    })
})