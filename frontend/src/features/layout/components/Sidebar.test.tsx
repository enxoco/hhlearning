import Sidebar from "./Sidebar";
import { render } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'


test("Sidebar renders correct links for admin users", async () => {

  const testUser = {
    id: "1",
    name: "Mike Conrad",
    firstName: "Mike",
    email: "mikeconrad@onmail.com",
    isAdmin: true
  }

  const component = render(
    <Sidebar user={testUser} path="/dashboard" />, { wrapper: BrowserRouter }
  );

  const links = await component.findByTestId("sidebarLinks")
  expect(links.querySelector("[href$=dashboard]")).toBeDefined()
  expect(links.querySelector("[href$=teachers]")).toBeDefined()
  expect(links.querySelector("[href$=former-students]")).toBeDefined()
  expect(links.querySelector("[href$=parents]")).toBeDefined()
  expect(links.querySelector("[href$=settings]")).toBeDefined()
  expect(links.querySelector("[href$=former-students]")).toBeDefined()
  expect(links.querySelector("[href$=students]").children[0].textContent).toEqual("Current Students")

  expect(component).toMatchSnapshot()
});

test("Sidebar renders correct links for non admin users", async () => {

  const testUser = {
    id: "1",
    name: "Mike Conrad",
    firstName: "Mike",
    email: "mikeconrad@onmail.com",
    isAdmin: false
  }

  const component = render(
    <Sidebar user={testUser} path="/dashboard" />, { wrapper: BrowserRouter }
  );

  const links = await component.findByTestId("sidebarLinks")
  expect(links.querySelector("[href$=dashboard]")).toBeDefined()
  expect(links.querySelector("[href$=teachers]")).toBeNull()
  expect(links.querySelector("[href$=parents]")).toBeNull()
  expect(links.querySelector("[href$=settings]")).toBeNull()
  expect(links.querySelector("[href$=former-students]")).toBeNull()
  expect(links.querySelector("[href$=students]").children[0].textContent).toEqual("All Students")

  expect(component).toMatchSnapshot()
});
