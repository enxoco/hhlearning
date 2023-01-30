import {ImpersonateUser} from "#/components/Buttons/ImpersonateUser";
import {SendPasswordReset} from "#/components/Buttons/SendPasswordReset";
import { User } from "#/generated/graphql";
import { HStack} from "@chakra-ui/react";

export default function (user: User) {

  return (
    <HStack spacing="1">
      <ImpersonateUser user={user} />
      <SendPasswordReset email={user.email} />
    </HStack>
  )
}