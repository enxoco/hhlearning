import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, IconButton, Input, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FiCheck, FiPlusCircle, FiXCircle } from "react-icons/fi";
import { useAddChildToParentMutation, useCreateRelatedStudentMutation, useFindStudentsForParentsQuery, useRemoveChildFromParentMutation } from "#/generated/graphql";

type IAddStudentProps = {
    lastName: string,
    parentId: string,
    setParentId: Dispatch<SetStateAction<String>>;
    setParentName: Dispatch<SetStateAction<String>>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export default function AddStudentModal({ lastName, parentId, setParentId, setParentName, onOpen, isOpen, onClose }: IAddStudentProps) {
    const [relation, createRelation] = useCreateRelatedStudentMutation();
    const [childrenSearchResults, findChildren] = useFindStudentsForParentsQuery({ variables: { where: { lastName: { contains: lastName } } }, pause: !lastName })
    const [connectedStudent, setConnectedStudent] = useAddChildToParentMutation();
    const [removedChild, removeChild] = useRemoveChildFromParentMutation()
    const [firstName, setFirstName] = useState("");
    const handleAddStudent = () => {
        if (firstName) {
            createRelation({ parentId, firstName, lastName })
            setFirstName("")
            findChildren

        } else {
            findChildren
            setParentId(null)
            setParentName("")
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Students</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <FormHelperText>Enter the students first name</FormHelperText>
                        <Input name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    </FormControl>
                    <FormControl display="flex">
                        <Button ml="auto" my={5} isLoading={relation.fetching} colorScheme='blue' onClick={handleAddStudent}>Add</Button>

                    </FormControl>
                    <List my={5}>
                        {childrenSearchResults.data?.students.sort((a, b) => {
                            if (a.parent?.id === parentId) {
                                return -1;
                            } else {
                                return 1;
                            }
                        }).map((student) => {
                            if (student.parent) {
                                if (student.parent.id == parentId) {
                                    return (
                                        <ListItem key={student.id}>
                                            <Box display="flex" alignItems="center">
                                                <ListIcon as={FiCheck} color='green.500' />
                                                <Box>
                                                    {student.name}
                                                </Box><IconButton ml="auto" aria-label="Remove Child" borderRadius="50%" background="white" _hover={{ background: "red", color: "white" }} color="red" icon={<FiXCircle size="sm" />} onClick={() => {
                                                    removeChild({ studentId: student.id });
                                                    findChildren
                                                }} />

                                            </Box>
                                            <Divider my={5} />
                                        </ListItem>
                                    )
                                } else {
                                    return null
                                }
                            }
                            return (
                                <>
                                    <ListItem display="flex" key={student.id}>{student.name} <IconButton aria-label="Add Child" background="white" _hover={{ background: "green", color: "white" }} borderRadius="50%" color="green" ml="auto" icon={<FiPlusCircle size="sm" />} isDisabled={connectedStudent.fetching} onClick={() => {
                                        setConnectedStudent({ parentId, studentId: student.id })
                                        findChildren
                                    }} />
                                    </ListItem>
                                    <Divider my={5} />

                                </>
                            )
                        })}
                    </List>

                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}