import { useDeleteStudentMutation } from "#/generated/graphql";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useToast } from "@chakra-ui/react";
type IStudentModalProps = { 
    isOpen: boolean, 
    onClose: () => void, 
    onOpen: () => void, 
    studentId: string, 
    studentName: string 
}
export default function DeleteStudentModal({ isOpen, onClose, onOpen, studentId, studentName }: IStudentModalProps ) {
    const [deletedStudent, doDeleteStudent] = useDeleteStudentMutation()
    const toast = useToast({
        position: "top",
        duration: 9000,
        isClosable: true,
        status: "success"
    })
    const handleDeleteStudent = async () => {
        const {data, error} = await doDeleteStudent({ id: studentId })
        if (!error) {
            toast({
                title: studentName + " deleted successfully"
            })
            onClose()
        } else {
            toast({
                status: "error",
                title: "Error",
                description: error.message
            })
        }

      }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Student</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Do you really want to delete {studentName}?</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteStudent}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}