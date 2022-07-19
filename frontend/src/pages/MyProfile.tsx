import { Box, Button, FormControl, FormLabel, HStack, Input, Stack, useColorModeValue, Text, Heading, useToast, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { PersonalInfoCard } from "../components/AddressCard"
import Layout from "../components/Layout"
import { useUpdatePasswordMutation } from "../generated/graphql"
import { loggedInUser } from "../atom"
import { useRecoilState } from "recoil"
import { PasswordField } from "../components/PasswordField"

export const MyProfile = () => {
  const [me] = useRecoilState(loggedInUser)
  const [updatedPassword, setUpdatedPassword] = useState("")
  const [newPassword, doSetNewPassword] = useUpdatePasswordMutation()

  const doUpdatePassword = async () => {
    const result = await doSetNewPassword({ email: me.email, password: updatedPassword })
    toast({
      title: 'Password updated.',
      description: "We've updated your password for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top'
    })
  }

  const toast = useToast()
  return (
    <Layout customTitle="My Profile" description="">
      {/* <PersonalInfoCard maxW={{ lg: "3xl" }} /> */}
      <Box as="form" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg" maxW={{ lg: "3xl" }}>
        <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
        <Heading size='xs' mb={5}>Password</Heading>

          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl alignContent={'flex-end'} display='flex' flexDirection={'row'} flexWrap={'wrap'}>
              <Text mb={5}>Enter a new password below and click update.</Text>

                <PasswordField onChange={(e) => setUpdatedPassword(e.target.value)} />
                {/* <Input type="password" name="password" value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} /> */}
                <Button ml={'auto'} my={10} colorScheme="blue" onClick={doUpdatePassword} isLoading={newPassword.fetching}>
                  Update
                </Button>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  )
}
