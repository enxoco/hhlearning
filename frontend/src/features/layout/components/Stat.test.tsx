import '@testing-library/jest-dom';

import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react"
import { Stat } from "./Stat";

describe("Stat", () => {
    it("renders label and value", () => {
        render(
            <ChakraProvider>
                <Stat label={"Grades"} value="12" />
            </ChakraProvider>
        )
        expect(document.body.textContent).toContain("Grades")
        expect(document.body.textContent).toContain("12")
    })
})