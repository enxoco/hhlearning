import { screen, render } from "@testing-library/react"

import InitialsAvatar from "./InitialsAvatar";

let testUser = {
  name: "Mike Conrad",
  email: "mike.conrad.hhl@gmail.com"
}

describe("InitialsAvatar", () => {
  it("renders correctly", async () => {

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

  it("renders correctly when all letters are lowercase", async () => {
    testUser.name = "john doe smith"
    const component = render(
      <InitialsAvatar {...testUser} />
    )

    const badge = await screen.getByRole("img")
    expect(badge.classList.contains("initials-avatar")).toBe(true)
    expect(badge.children[0].textContent).toBe("JDS")
  })

  it("renders correctly when all letters are Uppercase", async () => {
    testUser.name = "JOHN DOE SMITH"
    const component = render(
      <InitialsAvatar {...testUser} />
    )
    const badge = await screen.getByRole("img")
    expect(badge.classList.contains("initials-avatar")).toBe(true)
    expect(badge.children[0].textContent).toBe("JDS")
  })

  it("renders correctly with mix of lowercase and uppercase letters", async () => {
    testUser.name = "JoHn dOe sMitH"
    const component = render(
      <InitialsAvatar {...testUser} />
    )

    const badge = await screen.getByRole("img")
    expect(badge.children[0].textContent).toBe("JDS")
  })

  it("renders maximum 3 letters", async () => {
    testUser.name = "JOHN DOE SMITH BOB BILL"
    const component = render(
      <InitialsAvatar {...testUser} />
    )

    const badge = await screen.getByRole("img")
    expect(badge.children[0].textContent.length).toBe(3)
    
  })

  it("renders maximum 3 words for name", async () => {
    testUser.name = "JOHN DOE SMITH BOB BILL"
    const component = render(
      <InitialsAvatar {...testUser} />
    )
    const wrapper = await component.findByTestId("userProfileBadge")
    expect(wrapper.children[0].textContent).toBe("John Doe Smith")
    
  })

  it("normalizes displayed name", async () => {
    testUser.name = "jOhn DoE sMiTh"
    const component = render(
      <InitialsAvatar {...testUser} />
    )
    const wrapper = await component.findByTestId("userProfileBadge")
    expect(wrapper.children[0].textContent).toBe("John Doe Smith")
    
  })
})



