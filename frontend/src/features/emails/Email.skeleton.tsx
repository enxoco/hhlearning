import Layout from "#/components/Layout";
import { Box, Divider, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";
export default function Skeleton({ }) {

    return (
        <Layout customTitle="Email" description="">
            <Stack spacing="5">
                <Box bgColor="white" p={5}>
                    <List>
                        <ListItem display="flex">
                            <Text fontWeight="bold" mr={5}>Recipient: </Text>
                            <Text></Text>
                        </ListItem>
                        <ListItem my={5} display="flex">
                            <Text fontWeight="bold" mr={5}>Subject: </Text>
                            <Text></Text>
                        </ListItem>
                        <ListItem display="flex">
                            <Text fontWeight="bold" mr={5}>Status: </Text>
                            <Text> at </Text>
                        </ListItem>
                        <ListItem my={5} display="flex">
                            <Text fontWeight="bold" mr={5}>Last Action: </Text>
                            <Text> at </Text>
                        </ListItem>
                    </List>
                    <Divider />
                    <Heading my={5} size="xs">Email Content</Heading>
                    <Box>

                    </Box>
                </Box>
            </Stack>
        </Layout>
    )
}