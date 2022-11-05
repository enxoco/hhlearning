import { Alert, AlertIcon, AlertTitle, Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, useBreakpointValue, useColorModeValue, Image } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Logo } from "../components/Logo"
import { PasswordField } from "../components/PasswordField"
import { useLoginMutation, useRegisterMutation } from "../generated/graphql"
import useDocumentTitle from "../utils/useDocumentTitle"
function Register() {
  useDocumentTitle("Hilger Portal - Registration")
  const [{ data, error, fetching }, registerUser] = useRegisterMutation({ requestPolicy: "cache-and-network" })
  const [loggedIn, doLogin] = useLoginMutation({ requestPolicy: "cache-and-network" })
  let navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)
  const [emailTaken, setEmailTaken] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleRegister = async () => {
    await registerUser({ email: email.toLowerCase(), password, name })

    if (error && error.message == "[GraphQL] Prisma error: Unique constraint failed on the fields: (`email`)") {
      setEmailTaken(true)
    }

    await doLogin({ email, password })
  }

  useEffect(() => {
    if (loggedIn && loggedIn.data?.authenticateUserWithPassword) {
      navigate("/dashboard")
    }
  }, [loggedIn.data])
  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center" alignItems={"center"}>
            <Logo />
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>Create Account</Heading>
          </Stack>
        </Stack>
        <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }} bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })} boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }} borderRadius={{ base: "none", sm: "xl" }}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="name" onChange={handleNameChange} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={handleEmailChange} />
              </FormControl>

              <PasswordField onChange={handlePasswordChange} />
            </Stack>
            <Stack spacing="6">
              {!emailTaken ? null : (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Email adress already in use</AlertTitle>
                </Alert>
              )}
              <Button variant="primary" onClick={handleRegister} isLoading={fetching}>
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default Register
