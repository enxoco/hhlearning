import { Flex, useColorModeValue, Stack, Divider, Image } from "@chakra-ui/react"
import { FiLogOut } from "react-icons/fi"

import logo from "#/logo.jpg";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation, User } from "#/generated/graphql";
import InitialsAvatar from "./InitialsAvatar";
import { Logo } from "./Logo";
import { NavButton } from "./NavButton";

export const SidebarShell = ({ children, user, path, showBadge = true }: { children: ReactNode, user?: User, path: string, showBadge?: boolean }) => {
    const navigate = useNavigate();
    const [, logOut] = useLogoutMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logOut({});
        navigate("/login");
    }
    return (
        <Flex as="section" minH="100vh" bg="bg-canvas" w={300}>
            <Flex
                flex="1"
                bg="bg-surface"
                overflowY="auto"
                boxShadow={useColorModeValue("md", "sm-dark")}
                maxW={{ base: "full", sm: "xs" }}
                py={{ base: "6", sm: "8" }}
                px={{ base: "4", sm: "6" }}
            >
                <Stack justify="space-between" spacing="1">
                    <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
                        <Logo />
                        {children}
                    </Stack>

                    {user && (
                        <Stack spacing={{ base: "5", sm: "6" }}>
                            <Stack spacing="1">
                                <NavButton
                                    label="Logout"
                                    icon={FiLogOut}
                                    onClick={handleLogout}
                                />
                            </Stack>
                            <Divider />
                            {user && showBadge ? (
                                <InitialsAvatar name={user.name || `${user.firstName} ${user.lastName}`} email={user.email} />
                            ) : null}
                        </Stack>
                    )}
                </Stack>
            </Flex>
        </Flex>
    )
}