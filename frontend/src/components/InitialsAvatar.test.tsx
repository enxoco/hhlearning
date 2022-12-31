import { screen, render } from "@testing-library/react"

import InitialsAvatar from "./InitialsAvatar";


test("initials render correctly", async () => {

  const testUser = {
    name: "Mike Conrad",
    email: "mike.conrad.hhl@gmail.com"
  }
  const component = render(
    <InitialsAvatar {...testUser}/>
  );

  const badge = await screen.getByRole("img")
  expect(badge.classList.contains("initials-avatar")).toBe(true)
  expect(badge.children[0].textContent).toBe("MC")

  const wrapper = await component.findByTestId("userProfileBadge")
  expect(wrapper.children[0].textContent).toBe(testUser.name)
  expect(wrapper.children[1].textContent).toBe(testUser.email)
  expect(component).toMatchSnapshot()
});

