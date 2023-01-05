import '@testing-library/jest-dom'
import ManageStudentsButton from "./ManageStudentsButton";
import { render } from "@testing-library/react"
import { renderHook } from '@testing-library/react-hooks'
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const { result: parentNameResult } = renderHook(() => useState(""));
const { result: parentIdResult } = renderHook(() => useState(""));
const { result: disclosureResult } = renderHook(() => useDisclosure());
test("renders add children button if no students found", async () => {
    const component = render(<ManageStudentsButton 
        id={"1"} 
        portalId={"abc"} 
        email={"test@test.com"} 
        students={[]} 
        setParentName={parentNameResult.current[1]} 
        lastName="Testerson" 
        setParentId={parentIdResult.current[1]} 
        onOpen={disclosureResult.current.onOpen} 
    />)

    expect(component.getByLabelText("Add Children")).toBeInTheDocument()
    expect(component.queryByLabelText("Manage Children")).not.toBeInTheDocument()
    expect(component).toMatchSnapshot()
})

test("renders manage children button if 1 or more students found", async () => {
    const component = render(<ManageStudentsButton 
        id={"1"} 
        portalId={"abc"} 
        email={"test@test.com"} 
        students={[{ id: "1", firstName: "Tom", lastName: "Test" }]} 
        setParentName={parentNameResult.current[1]} 
        lastName="Testerson" 
        setParentId={parentIdResult.current[1]} 
        onOpen={disclosureResult.current.onOpen} 
    />)

    expect(component.queryByLabelText("Add Children")).not.toBeInTheDocument()
    expect(component.getByLabelText("Manage Children")).toBeInTheDocument()
    expect(component).toMatchSnapshot()
})