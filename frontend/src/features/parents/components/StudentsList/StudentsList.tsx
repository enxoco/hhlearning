import { Box } from "@chakra-ui/react"
import { Student } from "#/generated/graphql";
type IStudentsListProps = {
  id: string;
  students: Student[];

}
export default function ({ id, students }: IStudentsListProps) {
  return (
    <Box data-testid="studentList" key={id} display="flex" alignItems="center">
      {students.map((a) => a.firstName).join(", ")}
    </Box>
  )
}