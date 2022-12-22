import { Box, Button, Container, Divider, Flex, Heading, Link, SimpleGrid, Stack, Text, Tooltip, useBreakpointValue, useColorModeValue, VStack } from "@chakra-ui/react"
import Stat from "../components/Stat"
import { ImpersonateUserBanner } from "./ImpersonatedUserBanner"

import SidebarSkeleton from "./SidebarSkeleton"
export default function PageSkeleton() {

  return (
<Flex as="section" direction={{ base: "column", lg: "row" }} height="100vh" bg="bg-canvas" overflowY="auto">
{/* {isDesktop ? <Sidebar /> : <Navbar />} */}
<SidebarSkeleton />
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
              Dashboard
            </Heading>
            <Text color="muted">Hilger Online Grading portal</Text>
          </Stack>
        </Stack>
        <Stack spacing={{ base: "5", lg: "6" }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <Stat label="" value={0} />
          <Stat label="" value={0} />
          <Stat label="" value={0} />
        </SimpleGrid>
      </Stack>

      <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }}>
        <Box bg="bg-surface" px={{ base: "4", md: "6" }} py="5" boxShadow={useColorModeValue("sm", "sm-dark")} borderTopWidth="4px" borderColor="accent">
          <Stack spacing="1" textAlign="center">
            <Text fontSize="xl" fontWeight="medium">
              Welcome to the Hilger Grading Portal
            </Text>
            <Text color="muted" fontSize="sm"></Text> <Divider my={10} height={50} />
            <Flex pt={10} alignItems="center" justifyContent="center">
              <Button mr={10} variant="primary">View All Students</Button>
              <Tooltip label="Only show students you have entered grades for">
                <Button mr={10} >
                  View My Students
                </Button>
              </Tooltip>
            
          </Flex>
          </Stack>
        </Box>
      </Box>
      </Stack>
    </Container>
  </Box>
</Box>
</Flex>
  )
}

