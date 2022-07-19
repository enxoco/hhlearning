import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Input, Stack, Text, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import Layout from "../components/Layout"
import { useBulkAddStudentsMutation, useCreateStudentMutation, useUpdateStudentInfoMutation } from "../generated/graphql"
import {useParams} from 'react-router-dom'
const AddStudentCard = ({student}) => {

  const [firstName, setFirstName] = useState(student?.firstName || null)
  const [lastName, setLastName] = useState(student?.lastName || null)

  const [bulkNames, setBulkNames] = useState([])
  const [bulkStudents, addBulkStudents] = useBulkAddStudentsMutation()
  const [{ data, error, fetching }, addStudent] = useCreateStudentMutation()
  const [updatedStudentInfo, updateStudentInfo] = useUpdateStudentInfoMutation()
  let { id } = useParams()

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
            id: +id,
            firstName: firstName,
            lastName: lastName,
          })
    }

  }

  const handleBulkNameUpdate = (e) => {
    setBulkNames(e.target.value)
  }
  const handleBulkSubmission = (e) => {
    let names = bulkNames
    let data = []
    for (const name of names.split("\n")) {
      let firstName = name.split(" ").slice(0, -1).join(" ")
      let lastName = name.split(" ").slice(-1).join(" ")
      data.push({ firstName, lastName })
    }
    addBulkStudents({ data })
    setBulkNames([])
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
