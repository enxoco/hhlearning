import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Stack, Text, Textarea, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import AddStudentCard from "#/components/AddStudentCard"
import Layout from "#/components/Layout"
import { useBulkAddStudentsMutation } from "#/generated/graphql"
import { useNavigate } from "react-router-dom"

const AddStudent = () => {

  const [bulkNames, setBulkNames] = useState<string>("");
  const [bulkStudents, addBulkStudents] = useBulkAddStudentsMutation();
  const navigate = useNavigate();

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
    setBulkNames("")
  }

  return (
    <Layout customTitle="Students">
      <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
        <HStack spacing="3">
          <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />}>
            Export
          </Button>
        </HStack>
      </Stack>

      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
              Add Student
            </Text>
          </Stack>
        </Box>
      <AddStudentCard student={null} />
      </Stack>

      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack direction={{ base: "column" }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
              Bulk Add Students
            </Text>
            <Text fontSize="sm" fontWeight="light">
              Enter each student on a seperate line.
            </Text>
          </Stack>
        </Box>
        <Box as="form" bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg">
          <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
            {bulkStudents.data ? (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>Students added successfully</AlertTitle>
              </Alert>
            ) : null}
            <Stack spacing="6" direction={{ base: "column", md: "row" }}>
              <FormControl id="firstName">
                <FormLabel>Students</FormLabel>
                <Textarea onChange={handleBulkNameUpdate} value={bulkNames} />
              </FormControl>
            </Stack>
          </Stack>
          <Divider />
          <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
            <Button variant="primary" onClick={handleBulkSubmission} isLoading={bulkStudents.fetching}>
              Save
            </Button>
          </Flex>
        </Box>
      </Stack>
    </Layout>
  )
}

export default AddStudent
