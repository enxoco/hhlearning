import { Alert, AlertIcon, AlertTitle, Box, Button, Checkbox, Container, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useBreakpointValue, useColorModeValue, Image } from "@chakra-ui/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PasswordField } from "../components/PasswordField"
import { useLoginMutation } from "../generated/graphql"
import useDocumentTitle from "../utils/useDocumentTitle"


function Login() {
  useDocumentTitle('Hilger Portal - Login')
  const [login, doLogin] = useLoginMutation()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  async function handleLogin(e) {
    e.preventDefault()
    const results = await doLogin({ email: email.toLowerCase(), password })

    if (results.data?.authenticateUserWithPassword?.item) {
      window.location.href = '/dashboard'
    }
  }
  
  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center" alignItems={"center"}>
            {login && login.data && login.data?.authenticateUserWithPassword?.message === "Authentication failed." ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{login.data?.authenticateUserWithPassword?.message === "Authentication failed." ? "Login failed.  Please check your password" : "Error logging in"}</AlertTitle>
              </Alert>
            ) : null}
            <Image src="https://hhlearning.com/wp-content/uploads/2017/04/cropped-HH-Logo.png" width={300} />
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have a password yet?</Text>
              <Link to="/forgot-password">
                <Button variant="link" colorScheme="blue">
                  Request Password
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }} bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })} boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }} borderRadius={{ base: "none", sm: "xl" }}>
          <form onSubmit={handleLogin}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" onChange={handleEmailChange} />
                </FormControl>
                <PasswordField onChange={handlePasswordChange} />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultIsChecked>Remember me</Checkbox>
                <Link to="/forgot-password">
                  <Button variant="link" colorScheme="blue" size="sm">
                    Forgot password?
                  </Button>
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary" type="submit" isLoading={login.fetching}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  )
}

export default Login
