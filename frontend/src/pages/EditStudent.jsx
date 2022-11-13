import { Box, Button, HStack, Stack, Text, Tooltip, useToast, Link as ChakraLink } from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { impersonateUser, loggedInUser, showNewCourseCard as showNewCourseCardAtom } from "../atom"

import AddStudentCard from "../components/AddStudentCard"
import EditStudentCard from "../components/EditCourseCard"
import Layout from "../components/Layout"
import { useCheckLoginQuery, useGetCoursesByStudentAndTeacherQuery, useGetStudentQuery } from "../generated/graphql"
import { hashids } from "../utils/hashids"

const EditStudent = () => {
  let { id } = useParams()
  const [user] = useRecoilState(loggedInUser)
  const [teacher, setTeacher] = useState(user.id)

  function addToast(courseName) {
    toastIdRef.current = toast({
      status: 'success',
      description: `${courseName || 'Course'} saved successfully`,
      position: 'top'
    })
  }

  // If we are reloading page then we have no state
  const [{ data: coursesData, error, fetching }, getCourses] = useGetCoursesByStudentAndTeacherQuery({
    pause: loggedInUser?.isParent,
    variables: {
      studentId: hashids.decode(id)[0],
      teacherId: teacher,
    },
    requestPolicy: 'network-only'
  })

  const [studentData] = useGetStudentQuery({ variables: { id: hashids.decode(id)[0] } })
  const [newCourseName, setNewCourseName] = useState("")
  const [newCourseGrade, setNewCourseGrade] = useState("")
  const [newCourse, setNewCourse] = useRecoilState(showNewCourseCardAtom)

  const [impersonatedUser] = useRecoilState(impersonateUser)
  const showNewCourseCard = () => {
    setNewCourse(true)
  }

  const hideNewCourseCard = () => {
    getCourses()
    setNewCourse(false)
    setNewCourseName("")
    setNewCourseGrade("")
    
    addToast()
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
            <Tooltip label={`View full report card for ${studentData.data?.firstName || "student"}`}>
              <ChakraLink href={`${import.meta.env.DEV ? "http://localhost:8081" : null}/print.php?student=${id}`} data-action="view-report" target="_blank">
                <Button variant="outline">View report card</Button>
              </ChakraLink>
            </Tooltip>
          ) : null}
        </HStack>
      </Stack>
      {!teacher || !studentData.data ? (
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
          <AddStudentCard student={studentData?.data?.student} hideNewCourseCard={hideNewCourseCard}/>
          ) : null}
          {!newCourse ? null : <EditStudentCard name={null} grade={null} feedback={null} id={null} student={id} teacher={impersonatedUser?.id || user.id} teacherName={impersonatedUser?.name || user.name} hideNewCourseCard={hideNewCourseCard} />}

          {
            coursesData?.courses.map((course) => (
              <EditStudentCard key={course.id} name={course.name} grade={course.grade} id={course.id} student={id} teacher={impersonatedUser?.id || user.id} teacherName={impersonatedUser?.name || user.name} feedback={course.feedback} hideNewCourseCard={hideNewCourseCard} />
            ))
          }
        </Stack>
      )}
    </Layout>
  )
}

export default EditStudent
