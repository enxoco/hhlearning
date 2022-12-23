import React from "react";
import renderer from "react-test-renderer";
import { Logo } from "../src/components/Logo";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Logo />
  );
  let tree = toJson(component);
  expect(tree).toMatchSnapshot();

});
