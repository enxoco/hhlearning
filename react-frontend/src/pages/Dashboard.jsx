import { Box, Button, Divider, Flex, Link, SimpleGrid, Stack, Text, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { loggedInUser, studentCount } from "../atom"
import Layout from "../components/Layout"
import { Stat } from "../components/Stat"
import { useGetMyCoursesCountByTeacherQuery, useStudentsCountQuery, useTotalCourseCountQuery } from "../generated/graphql"
const Dashboard = () => {
  const [{ data, error, fetching }, getStudentCount] = useStudentsCountQuery()
  const [students, setStudents] = useRecoilState(studentCount)
  const [user, setUser] = useRecoilState(loggedInUser)
  const [id, setId] = useState(null)
  const [courseCount, getCourseCount] = useGetMyCoursesCountByTeacherQuery({ pause: !id, variables: { id } })

  const [totalCourses, getTotalCourses] = useTotalCourseCountQuery()


  return (
    <Layout pageTitle="Dashboard" description="Hilger Online grading portal">
      <Stack spacing={{ base: "5", lg: "6" }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <Stat key="students" label="Students enrolled" value={students?.toString()} />
          <Stat key="myGrades" label="My Grades entered" value={courseCount?.data?.coursesCount || "0"} />

          <Stat key="grades" label="Total grades entered" value={totalCourses?.data?.coursesCount || 0} />
        </SimpleGrid>
      </Stack>

      <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }}>
        <Box bg="bg-surface" px={{ base: "4", md: "6" }} py="5" boxShadow={useColorModeValue("sm", "sm-dark")} borderTopWidth="4px" borderColor="accent">
          <Stack spacing="1" textAlign="center">
            <Text fontSize="xl" fontWeight="medium">
              Welcome to the new Hilger Grading Portal
            </Text>
            <Text color="muted" fontSize="sm"></Text> <Divider my={10} height={50} />
            {!user?.isParent ? (
              <Flex pt={10} alignItems="center" justifyContent="center">
                <Button mr={10} variant="primary">
                  <Link href="/students">View All Students</Link>
                </Button>
                {courseCount.data?.coursesCount == 0 ? null : (
                  <Tooltip label="Only show students you have entered grades for">
                    <Button mr={10}>
                      <Link href={`/students/${user ? user.id : null}`}>View My Students</Link>
                    </Button>
                  </Tooltip>
                )}
              </Flex>
            ) : (
              <Flex pt={10} alignItems="center" justifyContent="center">

              
                <Tooltip label="Only show students you have entered grades for">
                  <Button mr={10}>
                    <Link href={`/students/${user ? user.id : null}`}>View My Students</Link>
                  </Button>
                </Tooltip>
              
            </Flex>
            )}
          </Stack>
        </Box>
      </Box>
    </Layout>
  )
}

export default Dashboard
