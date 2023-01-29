import '@testing-library/jest-dom'
import StudentsList from "../StudentsList/StudentsList"
import { render } from "@testing-library/react"

test("renders empty div when no students passed", async () => {
    const component = render(<StudentsList 
        id={"1"} 
        students={[]} 
    />)
    expect(component.getByTestId("studentList")).toBeEmptyDOMElement()
})

test("correctly renders list of students", async () => {
    const students = [
        { id: "1", firstName: "Murphy" },
        { id: "2", firstName: "Croix" },
        { id: "3", firstName: "Jane Doe"}
    ]
    const component = render(<StudentsList 
        id={"1"} 
        students={students} 
    />)
    expect(component.getByTestId("studentList").textContent).toBe("Murphy, Croix, Jane Doe")
})
