import { Box, Button, HStack, Stack, Text, Tooltip, Link as ChakraLink, FormControl, FormLabel } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { impersonateUser, loggedInUser, showNewCourseCard as showNewCourseCardAtom } from "#/atom"

import AddStudentCard from "./components/AddStudentCard"
import EditStudentCard from "./components/EditCourseCard"
import Layout from "#/components/Layout"
import { useGetCoursesByStudentAndTeacherQuery, useGetStudentQuery } from "#/generated/graphql"
import Courses from "./components/Courses"
import useGetStudent from "./hooks/useGetStudent"

export default function EditStudent() {
  let { id } = useParams();
  const [user] = useRecoilState(loggedInUser)

  // const [studentData] = useGetStudentQuery({ variables: { id: id || "" }, pause: !id })
  const [newCourse, setNewCourse] = useRecoilState(showNewCourseCardAtom)
  const [studentFirstName, setStudentFirstName] = useState(studentData.data?.student?.firstName);
  const [studentLastName, setStudentLastName] = useState(studentData.data?.student?.lastName);
  const [impersonatedUser] = useRecoilState(impersonateUser)
  const query = useGetStudent(id || "");
  const showNewCourseCard = () => {
    setNewCourse(true)
  }

  useEffect(() => {
    // getCourses()
  }, [newCourse])

  useEffect(() => {
    if (studentFirstName != studentData.data?.student) {
      setStudentFirstName(studentData.data?.student?.firstName)
    }
  }, [studentData.data?.student])

  return (
    <Layout>
      <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
        <HStack spacing="3">
          <Tooltip label="Download a CSV file">
            <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />}>
              Export
            </Button>
          </Tooltip>
          <Button variant="primary" onClick={showNewCourseCard} data-action="add-course">
            Add Course
          </Button>

          {user?.isAdmin || impersonatedUser ? (
            <Tooltip label={`View full report card for ${studentData.data?.student?.firstName || "student"}`}>
              <ChakraLink href={`${import.meta.env.DEV ? "http://localhost:8081" : ""}/print.php?student=${studentData.data?.student?.portalId}`} data-action="view-report" target="_blank">
                <Button variant="outline">View report card</Button>
              </ChakraLink>
            </Tooltip>
          ) : null}
        </HStack>
      </Stack>
      {!studentData?.data?.student ? (
        <>loading</>
      ) : (
        <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
              Edit Student
            </Text>
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              {/* <Input defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} /> */}
            </FormControl>
          </Stack>
        </Box>
      </Stack>      
      )}
    </Layout>
  )
}