import { useGetCoursesByStudentAndTeacherQuery } from "#/generated/graphql";
import { Box, Stack, Text } from "@chakra-ui/react";

export default function Courses({ studentId, teacherId }: { studentId: string; teacherId: string }) {
      // If we are reloading page then we have no state
  const [{ data: coursesData, error, fetching }, getCourses] = useGetCoursesByStudentAndTeacherQuery({
    variables: {
      studentId,
      teacherId,
    },
    pause: !studentId,
    requestPolicy: 'network-only'
  })
    return (
        <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
              Edit Student
            </Text>
          </Stack>
        </Box>
      </Stack>
    )
}