import { User, useToggleAdminMutation } from "#/generated/graphql";
import { Button, FormControl, HStack } from "@chakra-ui/react";

export default function(user: User){
  const [toggleStatus, toggleAdmin] = useToggleAdminMutation();

    return (
        <HStack spacing="1">
          <FormControl display="flex" alignItems="center">
              <Button disabled={toggleStatus.fetching} colorScheme={user.isAdmin ? "blue" : "gray"} borderRadius={0} onClick={() => toggleAdmin({ id: user.id, isAdmin: true})}>Yes</Button>
              <Button disabled={toggleStatus.fetching} colorScheme={!user.isAdmin ? "blue" : "gray"} borderRadius={0} onClick={() => toggleAdmin({ id: user.id, isAdmin: false})}>No</Button>
          </FormControl>
        </HStack>
    )
}