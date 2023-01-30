import { Box, Button, Divider, Flex, Stack, Text, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { loggedInUser } from "#/atom"
import Layout from "#/features/layout/Layout"
import { useGetMyCoursesCountByTeacherQuery, useStudentsCountQuery, useTotalCourseCountQuery } from "../generated/graphql"
import { Stats } from "#/features/layout/components/Stats/Stats"
export const Dashboard = () => {
  const [studentCountQuery] = useStudentsCountQuery({ variables: { isFormer: false } })
  const [user] = useRecoilState(loggedInUser)
  const [id] = useState(user.id);
  const [courseCount] = useGetMyCoursesCountByTeacherQuery({ pause: !id, variables: { id } })
  const [totalCourses] = useTotalCourseCountQuery()

  const stats = [
    { label: "Students enrolled", value: studentCountQuery?.data?.studentsCount || 0 },
    { label: "My Grades entered", value: courseCount?.data?.coursesCount || 0 },
    { label: "Total grades entered", value: totalCourses?.data?.coursesCount || 0 }
  ]
  
  return (
    <Layout customTitle="Dashboard" description={`Hilger Online ${user?.isParent ? 'Parent' : 'Grading'} portal`}>

      <Stats stats={stats} />
      <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }}>
        <Box bg="bg-surface" px={{ base: "4", md: "6" }} py="5" boxShadow={useColorModeValue("sm", "sm-dark")} borderTopWidth="4px" borderColor="accent">
          <Stack spacing="1" textAlign="center">
            <Text fontSize="xl" fontWeight="medium">
              Welcome to the Hilger {user?.isParent ? 'Parent' : 'Grading'} Portal
            </Text>
            <Text color="muted" fontSize="sm"></Text> <Divider my={10} height={50} />
            <Flex pt={10} alignItems="center" justifyContent="center">
              <Link to="/students">
                <Button mr={10} variant="primary">View All Students
                </Button>
              </Link>
              {courseCount.data?.coursesCount == 0 ? null : (
                <Tooltip label="Only show students you have entered grades for">
                  <Link to={`/students/${user.id ?? null}`}>
                    <Button mr={10} >
                      View My Students
                    </Button>
                  </Link>
                </Tooltip>
              )}
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Layout>
  )
}