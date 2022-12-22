import Layout from "#/components/Layout";
import { Box, Code, Divider, FormControl, FormLabel, Heading, HStack, Input, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetMessages from "./hooks/useGetMessages";

export default function Email() {
    const { id } = useParams();
    const [, getMessageById, message] = useGetMessages();
    useEffect(() => {
        if (id) {
            getMessageById(id)
        }
    }, [])
    return (
        <Layout customTitle="Email" description="">
            <Stack spacing="5">
                <Box bgColor="white" p={5}>
                    <List>
                        <ListItem display="flex">
                            <Text fontWeight="bold" mr={5}>Recipient: </Text>  
                            <Text>{message?.Recipients[0]}</Text>   
                        </ListItem>
                        <ListItem my={5} display="flex">
                            <Text fontWeight="bold" mr={5}>Subject: </Text>  
                            <Text>{message?.Subject}</Text>   
                        </ListItem>
                        <ListItem display="flex">
                            <Text fontWeight="bold" mr={5}>Status: </Text>  
                            <Text>{message?.MessageEvents[0]?.Type} at {new Date(message?.MessageEvents[0].ReceivedAt).toLocaleString()}</Text>   
                        </ListItem>
                        <ListItem my={5} display="flex">
                            <Text fontWeight="bold" mr={5}>Last Action: </Text>  
                            <Text>{message?.MessageEvents[message?.MessageEvents.length - 1].Type.replace(/([A-Z])/g, " $1").trim()} at {new Date(message?.MessageEvents[message?.MessageEvents.length - 1].ReceivedAt).toLocaleString()}</Text>   
                        </ListItem>
                    </List>
                    <Divider />
                    <Heading my={5} size="xs">Email Content</Heading>
                    <Box dangerouslySetInnerHTML={{__html: message?.HtmlBody}}>
                        
                    </Box>
                </Box>
            </Stack>
        </Layout>

    )
}