import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, FormLabel, Input, Button, useDisclosure, useToast, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateParentMutation } from "#/generated/graphql"

export default function() {
    const [parentFirstName, setParentFirstName] = useState("");
    const [parentLastName, setParentLastName] = useState("");
    const [parentEmail, setParentEmail] = useState("");
    const [newParent, createNewParent] = useCreateParentMutation();
    const { onOpen, isOpen, onClose } = useDisclosure();
    const toast = useToast({
        position: "top",
        duration: 9000,
        isClosable: true
    });

    const handleAddParent = async (e) => {
        e.preventDefault()
        let uuid = self.crypto.randomUUID();
        createNewParent({
            name: parentFirstName,
            lastName: parentLastName,
            email: parentEmail,
            password: uuid
        })

        if (newParent.error) {
            if (newParent.error.message == "[GraphQL] Prisma error: Unique constraint failed on the fields: (`email`)")
                toast({
                    status: "error",
                    description: "There is already a family with this email address.  Please try another."
                })
        } else {
            toast({
                status: "success",
                description: "Parents added successfully"
            })
            setParentFirstName("")
            setParentLastName("")
            setParentEmail("")
            onClose()
        }

    }
    return (
        <>
            <HStack>
                <Button colorScheme="blue" ml="auto" onClick={onOpen}>Add Parents</Button>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Parents</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormControl>
                                <FormLabel htmlFor="firstName">First Names</FormLabel>
                                <Input value={parentFirstName} onChange={(e) => setParentFirstName(e.target.value)} required={true} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input value={parentLastName} onChange={(e) => setParentLastName(e.target.value)} required={true} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Primary Email</FormLabel>
                                <Input value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required={true} />
                            </FormControl>
                            <FormControl display="flex" my={5}>
                                <Button ml="auto" colorScheme="blue" type="submit" isDisabled={!parentFirstName || !parentLastName || !parentEmail} onClick={handleAddParent} isLoading={newParent.fetching}>Save</Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}