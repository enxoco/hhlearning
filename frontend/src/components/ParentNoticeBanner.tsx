import { Box, Container, Stack, Text } from "@chakra-ui/react"
import { useRecoilState } from "recoil"
import { loggedInUser as loggedInUserAtom } from '../atom'
export const ParentNoticeBanner = (props: any) => {

  const [loggedInUser] = useRecoilState(loggedInUserAtom)

  return (
    !loggedInUser?.isParent ? null : (
      loggedInUser.hasPaidTuition ? null : (
        <Box bg="bg-accent" color="on-accent" position="relative" w="100%">
          <Container py={{ base: "4", md: "3.5" }}>
            <Stack direction={{ base: "column", md: "row" }} justify="center" spacing={{ base: "0.5", md: "1.5" }} pe={{ base: "4", sm: "0" }}>
              <Text fontWeight="medium">You currently have an outstanding balance on your 2021-2022 school year's tuition. You will not be able to see your student(s) report card(s) until your tuition is paid in full. If you think you have paid this in full, or if you have questions about your balance, please contact Eddy Hilger at <a href="tel:423-653-1333">423.653.1333</a>.</Text>
            </Stack>
          </Container>
        </Box>
      )

    )
  )
  
}