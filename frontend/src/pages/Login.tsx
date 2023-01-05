import { Box, Button, Checkbox, Container, FormControl, FormLabel, Heading, HStack, Input, Stack, useBreakpointValue, useColorModeValue, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "#/features/layout/components/Logo"
import { PasswordField } from "#/components/PasswordField"
import { useLoginMutation } from "#/generated/graphql"
import useDocumentTitle from "#/utils/useDocumentTitle"


function Login() {
  useDocumentTitle('Hilger Portal - Login')
  const [login, doLogin] = useLoginMutation()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const toast = useToast()
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  async function handleLogin(e) {
    e.preventDefault()
    const { data } = await doLogin({ email: email.toLocaleLowerCase(), password })
    console.log("data", data);
    if (data?.authenticateUserWithPassword.__typename != 'UserAuthenticationWithPasswordFailure') {
      window.location.href = '/dashboard'
    } else {
      toast({
        position: 'top',
        status: 'error',
        title: 'Error logging in',
        description: 'Please check your username and password and try again.',
        isClosable: true,
        duration: 9000
      })
    }
  }
  
  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center" alignItems={"center"}>
            <Logo />
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Log in to your account</Heading>
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
                <Checkbox defaultChecked>Remember me</Checkbox>
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
