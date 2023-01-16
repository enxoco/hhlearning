import { loggedInUser } from "#/atom";
import ToggleButton from "#/components/buttons/ToggleButton";
import { Student, useToggleStudentActiveStatusMutation } from "#/generated/graphql";
import { FormControl, FormLabel, HStack, IconButton, Switch, Tooltip, useDisclosure } from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DeleteStudentModal from "./DeleteStudentModal";

type ITableActionProps = {
    student: Student
}
export default function TableActions({ student }: ITableActionProps) {

    const { id, name, isFormer } = student;
    const { onOpen, onToggle, onClose, isOpen } = useDisclosure();

    return (
        <>
            <DeleteStudentModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} studentId={id} studentName={name} />

            <HStack spacing="1" key={id}>
                <Link to={`/student/${id}`}>
                    <Tooltip label="Manage courses">
                        <IconButton icon={<FiEdit2 fontSize="1.25rem" />} variant="ghost" aria-label="Edit Course" />
                    </Tooltip>
                </Link>

                <Tooltip label="Delete student">
                    <IconButton icon={<FiTrash2 fontSize="1.25rem" />} variant="ghost" aria-label="Delete Student" onClick={onOpen} />
                </Tooltip>


            </HStack>
        </>
    )
}