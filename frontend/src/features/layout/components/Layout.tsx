import { loggedInUser } from "#/atom"
import { Box, Container, Flex, Heading, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { ReactElement } from "react"
import { useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"
import { ImpersonateUserBanner } from "./ImpersonatedUserBanner"
import Sidebar from "./Sidebar"
import useDocumentTitle from "#/utils/useDocumentTitle"

interface ILayoutProps {
  children: ReactElement | ReactElement[];
  customTitle?: string;
  description?: string;

}
export default function ({ children, customTitle, description }: ILayoutProps) {
  const [user] = useRecoilState(loggedInUser)

  const location = useLocation()
  let title = ""
  useDocumentTitle(`Hilger Portal - ${customTitle || title}`)

  return (
    <Flex as="section" direction={{ base: "column", lg: "row" }} height="100vh" bg="bg-canvas" overflowY="auto">
      <Sidebar user={user} path={location.pathname} />

      <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
        <Box bg="bg-canvas" borderTopLeftRadius={{ base: "none", lg: "2rem" }} height="full">
          <Container py="8" mx={1} maxWidth="100%">
            <VStack pb={5}>
              <ImpersonateUserBanner />
            </VStack>
            <Stack spacing={{ base: "8", lg: "6" }}>
              <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
                <Stack spacing="1">
                  <Heading size={useBreakpointValue({ base: "xs", lg: "sm" })} fontWeight="medium">
                    {customTitle || title}
                  </Heading>
                  <Text color="muted">{description}</Text>
                </Stack>
              </Stack>
              {children}
            </Stack>
          </Container>
        </Box>
      </Box>
    </Flex>
  )
}