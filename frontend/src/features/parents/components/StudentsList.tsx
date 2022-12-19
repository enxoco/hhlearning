import { Box, Tooltip, IconButton } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { OperationContext } from "urql";
type IStudentsListProps = {
  id: string;
  students: {
    firstName: string,
    lastName: string,
    id: number;
  }[];
  setParentName: Dispatch<SetStateAction<string>>;
  setParentId: Dispatch<SetStateAction<string>>;
  lastName: string; onOpen: () => void;
  fetchParents: (opts?: Partial<OperationContext>) => void;

}
export default function StudentsList({ id, lastName, students, setParentName, setParentId, onOpen, fetchParents }: IStudentsListProps) {
  return (
    <Box key={id} display="flex" alignItems="center">
      {students.map((student, index) => (
        <Box key={student.id}>
          {student.firstName}
          {index == students.length - 1 ? null : ", "}
        </Box>
      ))}
      {/* This is the button that needs to trigger our modal and pass down props */}
      {students.length ? (
        <Tooltip label="Manage Children" ml="auto">

          <IconButton aria-label="Manage Children" icon={<EditIcon />} color="green" background="white" borderRadius="50%" ml="auto" _hover={{ background: "green", color: "white" }} p={1} onClick={() => {
            setParentName(lastName)
            setParentId(id)
            onOpen()
          }} />
        </Tooltip>
      ) : (
        <Tooltip label="Add Children" ml="auto">

          <IconButton aria-label="Add Children" icon={<AddIcon />} color="green" background="white" borderRadius="50%" ml="auto" _hover={{ background: "green", color: "white" }} p={1} onClick={() => {
            setParentName(lastName)
            setParentId(id)
            onOpen()
          }} />
        </Tooltip>
      )}
    </Box>
  )
}