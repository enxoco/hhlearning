import { Box, Button, HStack, Stack, Text, Tooltip, Link as ChakraLink } from "@chakra-ui/react"
import { useEffect } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { impersonateUser, loggedInUser, showNewCourseCard as showNewCourseCardAtom } from "#/atom"

import AddStudentCard from "#/components/AddStudentCard"
import EditStudentCard from "#/components/EditCourseCard"
import Layout from "#/features/layout/Layout"
import { useGetCoursesByStudentAndTeacherQuery, useGetStudentQuery } from "#/generated/graphql"

export default function EditStudent() {
  let { id } = useParams()
  const [user] = useRecoilState(loggedInUser)


  // If we are reloading page then we have no state
  const [{ data: coursesData, error, fetching }, getCourses] = useGetCoursesByStudentAndTeacherQuery({
    variables: {
      studentId: id,
      teacherId: user.id,
    },
    pause: !id,
    requestPolicy: 'network-only'
  })

  const [studentData] = useGetStudentQuery({ variables: { id: id }, pause: !id})
  const [newCourse, setNewCourse] = useRecoilState(showNewCourseCardAtom)

  const [impersonatedUser] = useRecoilState(impersonateUser)
  const showNewCourseCard = () => {
    setNewCourse(true)
  }

  useEffect(() => {
    getCourses()
  }, [newCourse])

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
      {!studentData.data ? (
        <>loading</>
      ) : (
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack direction={{ base: "column", md: "row" }} justify="space-between">
              <Text fontSize="lg" fontWeight="medium">
                Edit Student
              </Text>
            </Stack>
          </Box>
          {!fetching && loggedInUser && !studentData.fetching ? (
          <AddStudentCard student={studentData?.data?.student} />
          ) : null}
          {!newCourse ? null : <EditStudentCard name={null} grade={null} feedback={null} id={null} student={id} teacher={impersonatedUser?.id || user.id} teacherName={impersonatedUser?.name || user.name} />}

          {
            coursesData?.courses?.map((course) => (
              <EditStudentCard key={course.id} name={course.name} grade={course.grade} id={course.id} student={id} teacher={impersonatedUser?.id || user.id} teacherName={impersonatedUser?.name || user.name} feedback={course.feedback} />
            ))
          }
        </Stack>
      )}
    </Layout>
  )
}