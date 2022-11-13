import { Box, Button, Divider, Flex, SimpleGrid, Stack, Text, Tooltip, useColorModeValue, Link as ChakraLink } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { loggedInUser, studentCount } from "../atom"
import Layout from "../components/Layout"
import { Stat } from "../components/Stat"
import { Link } from "react-router-dom"
import { useGetMyCoursesCountByTeacherQuery, useStudentsCountQuery, useTotalCourseCountQuery } from "../generated/graphql"
import { hashids } from "../utils/hashids"
const Dashboard = () => {
  const [studentCountQuery] = useStudentsCountQuery()
  const [user] = useRecoilState(loggedInUser)
  const [id] = useState(null)
  const [courseCount] = useGetMyCoursesCountByTeacherQuery({ pause: !id, variables: { id } })

  const [totalCourses] = useTotalCourseCountQuery()
  return (
    <Layout pageTitle="Dashboard" description={`Hilger Online ${user?.isParent ? 'Parent' : 'Grading' } portal`}>
      {!user?.isParent ? (
              <Stack spacing={{ base: "5", lg: "6" }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
                <Stat key="students" label="Students enrolled" value={studentCountQuery?.data?.studentsCount?.toString() || 0} />
                <Stat key="myGrades" label="My Grades entered" value={courseCount?.data?.coursesCount || 0} />
                <Stat key="grades" label="Total grades entered" value={totalCourses?.data?.coursesCount || 0} />
              </SimpleGrid>
            </Stack>
      ) : null}
      <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }}>

        <Box bg="bg-surface" px={{ base: "4", md: "6" }} py="5" boxShadow={useColorModeValue("sm", "sm-dark")} borderTopWidth="4px" borderColor="accent">
          <Stack spacing="1" textAlign="center">
            <Text fontSize="xl" fontWeight="medium">
              Welcome to the Hilger {user?.isParent ? 'Parent' : 'Grading' } Portal
            </Text>
            <Text color="muted" fontSize="sm"></Text> <Divider my={10} height={50} />
            {!user?.isParent ? (
              <Flex pt={10} alignItems="center" justifyContent="center">
                <Button mr={10} variant="primary">
                  <Link to="/students">View All Students</Link>
                </Button>
                {courseCount.data?.coursesCount == 0 ? null : (
                  <Tooltip label="Only show students you have entered grades for">
                    <Button mr={10}>
                      <Link to={`/students/${user ? hashids.encode(user.id) : null}`}>View My Students</Link>
                    </Button>
                  </Tooltip>
                )}
              </Flex>
            ) : (// Information to be displayed to parents
              <Flex pt={10} alignItems="center" justifyContent="center">
                <Tooltip label="View the directory of families">
                  <Button mr={10} variant="primary">
                    <Link to="https://docs.google.com/spreadsheets/d/1pyBrSRwzuafzCzWE0IrwnxoREcq0ZrZNVlGmMUEFe9k/edit?usp=sharing" target={"_blank"}>Directory of Families</Link>
                  </Button>
                </Tooltip>
                <Tooltip label="View the directory of faculty and staff">
                <Button mr={10} variant="primary">
                    <Link to="https://docs.google.com/document/d/1IqfidHQFjfLJQB7hqRKDhb95vL2w1AySRoGmG1aJjX4/edit?usp=sharing" target={"_blank"}>Directory of Faculty and Staff</Link>
                  </Button>
                </Tooltip>
                <Tooltip label="View my students">
                <Button mr={10} variant="primary">
                    <Link to={`/students/${user ? hashids.encode(user.id) : null}`} data-action="view-my-students">View My Students</Link>
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
