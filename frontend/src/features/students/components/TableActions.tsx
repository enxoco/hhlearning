import { loggedInUser } from "#/atom";
import { useGetAllStudentsQuery, useToggleStudentActiveStatusMutation } from "#/generated/graphql";
import { FormControl, FormLabel, HStack, IconButton, Switch, Tooltip, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

type ITableActionProps = { 
    id: string, 
    isFormer?: boolean, 
    name: string, 
    studentId: string, 
    setStudentId: Dispatch<SetStateAction<string>>,
    studentName: string, 
    setStudentName: Dispatch<SetStateAction<string>>, 
    onOpen: () => void 
}
export default function TableActions({ id, isFormer, name, studentId, setStudentId, studentName, setStudentName, onOpen }: ITableActionProps) {
    const isLoggedIn = useRecoilValue(loggedInUser)
    const [, toggleActiveStudent] = useToggleStudentActiveStatusMutation()
    const [, getStudentData] = useGetAllStudentsQuery({ variables: { limit: 1000, offset: 0, isFormer: isFormer || false } })

    const showDeleteModal = (id: string, name: string) => {
        setStudentId(id)
        setStudentName(name)
        onOpen()
    }
    return (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <HStack spacing="1" key={id} data-key={id}>
            <Link to={`/student/${id}`}>
                <Tooltip label="Manage courses">
                    <IconButton icon={<FiEdit2 fontSize="1.25rem" />} variant="ghost" aria-label="Edit Course" />
                </Tooltip>
            </Link>

            <Tooltip label="Delete student">
                <IconButton icon={<FiTrash2 fontSize="1.25rem" />} variant="ghost" aria-label="Delete Student" onClick={() => showDeleteModal(id, name)} />
            </Tooltip>
            {isLoggedIn?.isAdmin && (
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="studentStatus">Active</FormLabel>

                    <Switch id="studentStatus" isChecked={isFormer === false} key={id} onChange={(e) => {
                        isFormer = !isFormer
                        toggleActiveStudent({ id: id, isFormer: isFormer });
                        getStudentData();
                    }}></Switch>

                </FormControl>
            )}

        </HStack>
    )
}