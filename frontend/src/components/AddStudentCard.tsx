import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, Flex, FormControl, FormLabel, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useCreateStudentMutation, useUpdateStudentInfoMutation } from "../generated/graphql"
import {useParams} from 'react-router-dom'

const AddStudentCard = ({student}) => {

  const [firstName, setFirstName] = useState(student?.firstName || null)
  const [lastName, setLastName] = useState(student?.lastName || null)
  const [{ data, error }, addStudent] = useCreateStudentMutation()
  const [updatedStudentInfo, updateStudentInfo] = useUpdateStudentInfoMutation()
  let { id } = useParams()
  const toast = useToast({ position: 'top', isClosable: true, duration: 9000 });
  const handleFirstNameUpdate = (e) => {
    setFirstName(e.target.value)
  }

  const handleLastNameUpdate = (e) => {
    setLastName(e.target.value)
  }

  const handleFormSubmit = (e) => {
      e.preventDefault()
    if (!student) {
        addStudent({ firstName, lastName })
        if (error) {
          console.error("error", error)
          return
        }

    } else {
        updateStudentInfo({
          id: id,
          firstName: firstName,
          lastName: lastName,
          isFormer: false
        })
    }
    toast({
      title: 'Success',
      status: 'success',
      description: 'Student updated successfully'
    })

  }

  return (
    <Box bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg">
    {data?.createStudent ? (
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Student added successfully</AlertTitle>
      </Alert>
    ) : null}
    <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
      <Stack spacing="6" direction={{ base: "column", md: "row" }}>
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input defaultValue={firstName} onChange={handleFirstNameUpdate} />
        </FormControl>
        <FormControl id="lastName" placeholder="">
          <FormLabel>Last Name</FormLabel>
          <Input value={lastName} onChange={handleLastNameUpdate} />
        </FormControl>
      </Stack>
    </Stack>
    <Divider />
    <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
      <Button variant="primary" onClick={handleFormSubmit}>
        Save
      </Button>
    </Flex>
  </Box>
  )
}

export default AddStudentCard
