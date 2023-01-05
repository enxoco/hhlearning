import Layout from "#/features/layout/Layout";
import { useGetStudentsByParentQuery, useGetUserQuery, useUpdateUserMutation } from "#/generated/graphql";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, IconButton, Input, Link, List, ListIcon, ListItem, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const { id } = useParams();
    const [email, setEmail] = useState("");

    const [{ data, error, fetching }, getUser] = useGetUserQuery({ variables: { id: id }, pause: !id });
    const [students, getStudents] = useGetStudentsByParentQuery({ variables: { email: email }, pause: !email });
    const [updatedUserData, updateUser] = useUpdateUserMutation();

    const formRef = createRef<HTMLFormElement>();
    const handleForm = () => {
        const formData = new FormData(formRef.current)
        const updateObj = {};
        for (const [key, value] of formData) {
            updateObj[key] = value
        }
        updateUser({ id: id, data: updateObj })
    }

    function FormField({ id, label }: { id: string; label: string; }) {
        return (
            <FormControl id={id}>
                <FormLabel>{label}</FormLabel>
                <Input name={id} defaultValue={data.user[`${id}`]} />
            </FormControl>
        )
    }

    useEffect(() => {
        if (data?.user?.email) {
            if (data.user.email != email) {
                setEmail(data.user.email);
                getStudents();
            }
        }
    }, [data?.user?.email])


    return (
        <Layout customTitle="Edit Parents">
            {data.user && (
                <Stack spacing="5">
                    <Box px={{ base: "4", md: "6" }} pt="5">
                        {updatedUserData.error ? (
                            updatedUserData?.error.message
                        ) : ""}
                        <Box bg="bg-surface" boxShadow={useColorModeValue("sm", "sm-dark")} borderRadius="lg">
                            <form ref={formRef}>
                                <Stack spacing="5" px={{ base: "4", md: "6" }} py={{ base: "5", md: "6" }}>
                                    <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                                        <FormField id="firstName" label="First Name" />
                                        <FormField id="lastName" label="Last Name" />
                                        <FormField id="email" label="Email Address" />
                                    </Stack>
                                    <Stack my={5}>
                                        <Text fontWeight="bold">Portal Link</Text><Link href={`https://portal.hhlearning.com/parents/${data?.user?.portalId}`}>https://portal.hhlearning.com/parents/{data?.user?.portalId}</Link>
                                    </Stack>
                                    <Divider />
                                    <VStack spacing="6" direction={{ base: "column", md: "row" }}>
                                        <Heading size="xs">Students</Heading>
                                        <List my={5}>
                                            {students.data?.students.map((student) => {
                                                return (
                                                    <ListItem key={student.id}>
                                                        <Box display="flex" alignItems="center">
                                                            <ListIcon as={CheckIcon} color='green.500' />
                                                            <Box>
                                                                {student.name}
                                                            </Box><IconButton ml="auto" aria-label="Remove Child" borderRadius="50%" background="white" _hover={{ background: "red", color: "white" }} color="red" icon={<CloseIcon />} />
                                                        </Box>
                                                        <Divider my={5} />
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </VStack>
                                </Stack>
                                <Divider />
                                <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
                                    <Button variant="primary" onClick={handleForm}>
                                        Save
                                    </Button>
                                </Flex>
                            </form>
                        </Box>
                    </Box>

                </Stack>
            )}

        </Layout>
    )
}