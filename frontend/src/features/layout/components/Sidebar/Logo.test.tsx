import { screen, render } from "@testing-library/react"

import { Logo } from "./Logo";


it("renders correctly", async () => {

  const component = render(
    <Logo />
  );

  const badge = await screen.getByRole("img")
  expect(component).toMatchSnapshot()
});

