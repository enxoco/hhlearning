import { Box, Heading, HStack, List, ListItem, Skeleton, Stack, useDisclosure, Flex, Grid, Button, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Layout from "#/components/Layout"

import { ArrowUpIcon } from "@chakra-ui/icons"
import useGetMessages from "./hooks/useGetMessages"
import { Link } from "react-router-dom"

export default function Index() {

  const [messages, setMessages, _, getMessages] = useGetMessages();
  const [recipientSearchTerm, setRecipientSearchTerm] = useState("");
  const [debouncedRecipient, setDebouncedRecipient] = useState("");
  const [subjectSearchTerm, setSubjectSearchTerm] = useState("");
  const [debouncedSubject, setDebouncedSubject] = useState("");
  const [pages, setPages] = useState({
    firstPage: 0,
    curPage: 0,
    lastPage: 0,
    totalPages: [0]
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const lastPage = Math.ceil(messages?.TotalCount / 10);
    const totalPageCount: number[] = [];
    for(var i = 0; i < lastPage; i++) {
      totalPageCount.push(i + 1);
    }
    setPages({
      firstPage: 0,
      curPage: 0,
      lastPage: lastPage,
      totalPages: totalPageCount
    })
  }, [messages?.Messages])

  useEffect(() => getMessages(currentPage), [currentPage])
  useEffect(() => getMessages(currentPage, debouncedRecipient, subjectSearchTerm), [debouncedRecipient, subjectSearchTerm])
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (recipientSearchTerm != debouncedRecipient) {
        setDebouncedRecipient(recipientSearchTerm)
      }
      if (subjectSearchTerm != debouncedSubject) {
        setDebouncedSubject(subjectSearchTerm)
      }
    }, 500)
    return () => clearTimeout(debounceTimeout)
  }, [recipientSearchTerm, subjectSearchTerm])
  return (
    <Layout customTitle="All Emails" description="">
      <Box p={0}>

        <List bgColor="white" p={5} border="1px solid #f5f5f5" borderRadius={10}>
          <ListItem mb={5} border="5px solid #f8fafc" p={5}>
            <Grid gridTemplateColumns="5% 25% 35% auto" gridColumnGap={10}>
              <Heading size="xxs" >Event</Heading>
              <Box>
                <Heading size="xxs">Recipient</Heading>
                <Input mt={5} name="recipient" value={recipientSearchTerm} onChange={(e) => setRecipientSearchTerm(e.target.value)} placeholder="Search by full email address" />
              </Box>
              
              <Box>
                <Heading size="xxs">Subject</Heading>
                <Input mt={5} name="subject" value={subjectSearchTerm} onChange={(e) => setSubjectSearchTerm(e.target.value)} placeholder="Search by email subject line" />
              </Box>
              <Heading size="xxs" >Date & Time</Heading>
            </Grid>
          </ListItem>
          {messages?.Messages?.map((message) => (
            <ListItem key={message.MessageID} border="5px solid #f8fafc" p={5}>
              <Link to={`/emails/${message.MessageID}`}>
                <Grid gridTemplateColumns="5% 25% 35% auto" gridColumnGap={10} gridRowGap={10} mb={5}>
                  <Box textAlign="left" alignItems="center">{message.Status}</Box>
                  <Box textAlign="left" alignItems="center">{message.Recipients.toString()}</Box>
                  <Box textAlign="left" alignItems="center">{message.Subject}</Box>
                  <Box textAlign="left" alignItems="center">{message.ReceivedAt}</Box>
                </Grid>
              </Link>
            </ListItem>

          ))}
                  <ListItem mt={5}>
        <HStack spacing={10}>
          {pages?.totalPages?.map((page) => (
            <Button key={page} isActive={page == currentPage} onClick={() => setCurrentPage(page)}>{page}</Button>
          ))}
        </HStack>
        </ListItem>
        </List>


      </Box>
    </Layout>
  )
}
