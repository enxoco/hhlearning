import { 
  Box,
  Button,
  Flex,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertIcon, } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { InputField } from "../components/InputField"
import { UserContext } from "../UserContext"
import { PasswordField } from '../components/PasswordField'
import { toErrorMap } from "../utils/toErrorMap"
import {useLoginMutation} from '../generated/graphql'
import { useIsAuth } from "../utils/useIsAuth"
function Login() {
  useIsAuth()
  const { state, setState } = useContext(UserContext)
  const [isPaused, setIsPaused] = useState(true)
  const [login, doLogin] = useLoginMutation({
    pause: isPaused
  }) 
  let navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  // const [cookies, setCookie, removeCookie] = useCookies(['keystonejs-session']);

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  async function handleLogin(e) {
    e.preventDefault()
    const results = await doLogin({email, password})
    console.log('results', results.data?.authenticateUserWithPassword?.item)

    if (results.data?.authenticateUserWithPassword?.item){
      navigate('/dashboard')

    }
  }
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          {(login && login.data ) ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{(login.data?.authenticateUserWithPassword?.message === "Authentication failed.") ? "Login failed.  Please check your password" : "Error logging in"}</AlertTitle>
            </Alert>
          ) : null }
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Log in to your account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Button variant="link" colorScheme="blue">
              Sign up
            </Button>
          </HStack>
        </Stack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" onChange={handleEmailChange} />
            </FormControl>
            <PasswordField onChange={handlePasswordChange}/>
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
            <Button variant="primary" onClick={handleLogin}>Sign in</Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>

  )
}

export default Login
