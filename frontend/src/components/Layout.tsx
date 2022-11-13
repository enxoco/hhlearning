import { Box, Container, Flex, Heading, Spinner, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { Children, ReactElement } from "react"
import { ImpersonateUserBanner } from "../components/ImpersonatedUserBanner"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import useDocumentTitle from "../utils/useDocumentTitle"
import { ParentNoticeBanner } from "./ParentNoticeBanner"

interface ILayoutProps {
  children: ReactElement | ReactElement[];
  customTitle?: string;
  description?: string;

}
const Layout = ({ children, customTitle, description }: ILayoutProps) => {

  const isDesktop = useBreakpointValue({ base: false, lg: true })

  let title = ""
  useDocumentTitle(`Hilger Portal - ${customTitle || title}`)

  return (
    <Flex as="section" direction={{ base: "column", lg: "row" }} height="100vh" bg="bg-canvas" overflowY="auto">
      {isDesktop ? <Sidebar /> : <Navbar />}

      <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
        <Box bg="bg-canvas" borderTopLeftRadius={{ base: "none", lg: "2rem" }} height="full">
          <Container py="8">
            <VStack pb={5}>
              <ImpersonateUserBanner />
              <ParentNoticeBanner />
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

export default Layout
