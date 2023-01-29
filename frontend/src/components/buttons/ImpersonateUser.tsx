import { User } from "#/generated/graphql";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { impersonateUser, loggedInUser as loggedInUserAtom } from "#/atom";

export const ImpersonateUser = ({user}: {user: User}) => {
    const [, setImpersonatedUser] = useRecoilState(impersonateUser);
    const [, setUser] = useRecoilState(loggedInUserAtom);
  
    function impersonate() {
        setImpersonatedUser(user);
        setUser(user);
    }
    return (
        <Tooltip label="Impersonate Teacher">
            <IconButton
                icon={<FiLogIn fontSize="1.25rem" />}
                variant="ghost"
                aria-label="Impersonate Teacher"
                onClick={impersonate}
            />
      </Tooltip>
    )
}