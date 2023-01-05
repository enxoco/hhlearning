import { Alert, AlertIcon, AlertTitle, Box, Button, Container, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "#/features/layout/components/Logo"
import { useForgotPasswordMutation } from "../../generated/graphql"
import useDocumentTitle from "../../utils/useDocumentTitle"

function ForgotPassword() {
  useDocumentTitle('Hilger Portal - Forgot password')
  const [{data, error, fetching}, doPasswordReset] = useForgotPasswordMutation()
  const [email, setEmail] = useState(null)
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  async function handleRequest(e) {
    e.preventDefault()
    const results = await doPasswordReset({ email })
    setStatus("Please check your email for a password reset link.")
    if (results.data.sendUserPasswordResetLink) {
      navigate("/dashboard")
    }
  }

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center" alignItems={"center"}>
            <Logo />
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Request new password</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Enter the email address associated with your account. </Text>
            </HStack>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack>
            {status ? (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>{status}</AlertTitle>
              </Alert>
            ) : null}
          </Stack>
        </Stack>
        <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }} bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })} boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }} borderRadius={{ base: "none", sm: "xl" }}>
          <form onSubmit={handleRequest}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" onChange={handleEmailChange} />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button variant="primary" onClick={handleRequest} isLoading={fetching} disabled={data?.sendUserPasswordResetLink}>
                  Request password reset
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}

export default ForgotPassword
