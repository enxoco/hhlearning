import { Divider, Flex, Stack, useColorModeValue, Image } from "@chakra-ui/react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { NavButton } from "./NavButton/NavButton";
import logo from "#/logo.jpg";

export default function SidebarSkeleton(){
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
              <Image mx="auto" src={logo} h={217} w={225} />
    
              <Stack spacing="1">
                  <NavButton
                    label="Dashboard"
                    icon={FiHome}
                    aria-current={
                      location.pathname.includes("dashboard") ? "page" : null
                    }
                  />
              </Stack>
            </Stack>
            <Stack spacing={{ base: "5", sm: "6" }}>
              <Stack spacing="1">
    
                <NavButton
                  label="Logout"
                  icon={FiLogOut}
                />
              </Stack>
    
              <Divider />
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    )
}