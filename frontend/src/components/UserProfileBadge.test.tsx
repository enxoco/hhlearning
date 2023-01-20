import { render } from "@testing-library/react"
import '@testing-library/jest-dom';

import UserFactory from "#/factories/users";
import UserProfileBadge from "./UserProfileBadge";

const Users = new UserFactory();

test("profile badge renders correctly", () => {
    const users = Users.CreateUsers(3);
    expect(users).toHaveLength(3);
    const component = render(<UserProfileBadge name={users[0].name} email={users[0].email}  />);
    
    for (let i = 0; i < users.length; i++) {
        component.rerender(<UserProfileBadge name={users[i].name} email={users[i].email}  />)
        // our component should render 2 p tags.
        // 1 with full name and 1 with email
        const pTags = component.getAllByRole("paragraph");
        expect(pTags).toHaveLength(2)
        expect(pTags[0]).toHaveTextContent(users[i].name)
        expect(pTags[1]).toHaveTextContent(users[i].email)
    }
})