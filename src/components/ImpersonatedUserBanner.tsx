import { Box, Button, CloseButton, Container, Link, Stack, Text } from "@chakra-ui/react"
import * as React from "react"
import { useRecoilState } from "recoil"
import {impersonateUser as impersonateUserAtom} from '../atom'
export const ImpersonateUserBanner = (props: any) => {

  const [impersonatedUser, setImpersonatedUser] = useRecoilState(impersonateUserAtom)
  const unimpersonate = () => {
    
  }
  return (
    !impersonatedUser ? null : (
        <Box bg="bg-accent" color="on-accent" position="relative" w="100%">
          <Container py={{ base: "4", md: "3.5" }}>
            <Stack direction={{ base: "column", md: "row" }} justify="center" spacing={{ base: "0.5", md: "1.5" }} pe={{ base: "4", sm: "0" }}>
              <Text fontWeight="medium">You are currently viewing the portal as {impersonatedUser.name || impersonatedUser.email}</Text>
              <Text color="on-accent-muted">To go back to your account <Link variant="ghost" onClick={() => window.location.href ="/teachers"}>Click Here</Link></Text>
            </Stack>
            <CloseButton position="absolute" right="2" top="2.5" onClick={() => window.location.href ="/teachers"} />
          </Container>
        </Box>
    )
  )
  
}