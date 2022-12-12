import { Box, Button, Divider, Flex, SimpleGrid, Stack, Text, Tooltip, useColorModeValue, Link } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { loggedInUser } from "../atom"
import Layout from "../components/Layout"
import { Stat } from "../components/Stat"
import { useGetMyCoursesCountByTeacherQuery, useStudentsCountQuery, useTotalCourseCountQuery } from "../generated/graphql"
const Dashboard = () => {
  const [studentCountQuery] = useStudentsCountQuery({ variables: { isFormer: false } })
  const [user] = useRecoilState(loggedInUser)
  const [id] = useState(null)
  const [courseCount] = useGetMyCoursesCountByTeacherQuery({ pause: !id, variables: { id } })
  const [totalCourses] = useTotalCourseCountQuery()
  return (
    <Layout customTitle="Dashboard" description={`Hilger Online ${user?.isParent ? 'Parent' : 'Grading'} portal`}>

      <Stack spacing={{ base: "5", lg: "6" }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
          <Stat key="students" label="Students enrolled" value={studentCountQuery?.data?.studentsCount?.toString() || 0} />
          <Stat key="myGrades" label="My Grades entered" value={courseCount?.data?.coursesCount || 0} />
          <Stat key="grades" label="Total grades entered" value={totalCourses?.data?.coursesCount || 0} />
        </SimpleGrid>
      </Stack>

      <Box as="section" pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "24" }}>

        <Box bg="bg-surface" px={{ base: "4", md: "6" }} py="5" boxShadow={useColorModeValue("sm", "sm-dark")} borderTopWidth="4px" borderColor="accent">
          <Stack spacing="1" textAlign="center">
            <Text fontSize="xl" fontWeight="medium">
              Welcome to the Hilger {user?.isParent ? 'Parent' : 'Grading'} Portal
            </Text>
            <Text color="muted" fontSize="sm"></Text> <Divider my={10} height={50} />
            <Flex pt={10} alignItems="center" justifyContent="center">
              
                <Link href="/students">
                <Button mr={10} variant="primary">View All Students
                </Button>
                </Link>
              
              {courseCount.data?.coursesCount == 0 ? null : (
                <Tooltip label="Only show students you have entered grades for">
                  <Link href={`/students/${user.id ?? null}`}>
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

export default Dashboard
