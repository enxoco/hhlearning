import { teachers } from "#/atom";
import { User } from "#/generated/graphql";
import {faker} from "@faker-js/faker";

export default class UserFactory {

    public CreateUsers(numOfUsers: number = 1): User[] {

        let users: User[] = [];

        for (var i = 0; i < numOfUsers; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const name = `${firstName} ${lastName}`;
            const email = faker.internet.email(firstName, lastName);
            users.push({
                firstName, 
                lastName, 
                email, 
                name, 
                id: i.toString()
            })
        }

        return users;

    }

    public SetAsAdmin(users: User[]): User[] {
        return users.map(user => {
            user.isAdmin = true;
            return user;
        });
    }
}