import { Box, Button, Container, Divider, Flex, FormControl, FormLabel, Input, Stack, Switch, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import Layout from "../components/Layout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PasswordField } from "../components/PasswordField"
import { useCreateTeacherMutation } from "../generated/graphql"
import useDocumentTitle from "../utils/useDocumentTitle"
function AddTeacher() {
  useDocumentTitle("Hiler Portal - Add teacher")
  const navigate = useNavigate()
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const isMobile = useBreakpointValue({ base: true, md: false })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const [{ data, error, fetching }, addTeacher] = useCreateTeacherMutation()

  const handleNameUpdate = (e) => {
    setName(e.target.value)
  }

  const handleEmailUpdate = (e) => {
    setEmail(e.target.value)
  }

  const handleIsAdminUpdate = (e) => {
    setIsAdmin(!isAdmin)
  }

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value)
  }

  const handleFormSubmit = async () => {
    await addTeacher({ name, email, password, admin: isAdmin })
    if (error) {
      console.error("error", error)
      return
    }
    navigate(0)
  }
  return (
    <Layout customTitle="Add Teacher" description="">
      <Stack spacing={{ base: "8", lg: "6" }}>
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack direction={{ base: "column", md: "row" }} justify="space-between">
              <Text fontSize="lg" fontWeight="medium">
                Add Teacher
              </Text>
            </Stack>
          </Box>
          <Box as="form" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg">
            <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input defaultValue={name} onChange={handleNameUpdate} />
                </FormControl>
                <FormControl id="email" onChange={handleEmailUpdate}>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue={email} />
                </FormControl>
              </Stack>

              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <PasswordField onChange={handlePasswordUpdate} />
                <PasswordField onChange={handlePasswordConfirmation} />
              </Stack>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="isAdmin" mb="0">
                  Make teacher an admin?
                </FormLabel>
                <Switch id="isAdmin" onChange={handleIsAdminUpdate} />
              </FormControl>
            </Stack>
            <Divider />
            <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
              <Button variant="primary" onClick={handleFormSubmit}>
                Save
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default AddTeacher
