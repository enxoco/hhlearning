import { Box, Button, Divider, Flex, HStack, IconButton, Input, List, ListItem, Stack, Text, Tooltip } from "@chakra-ui/react"
import { ChangeEvent, ReactNode, useEffect, useState } from "react"
import { FiArrowDown, FiArrowUp, FiDownloadCloud, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { loggedInUser as loggedInUserAtom } from "../atom"
import Layout from "../components/Layout"
import { Student, useGetMyStudentsQuery } from "../generated/graphql"
import { exportCSVFile } from "../utils/csvExport"

  export default function MyStudents(): ReactNode {
  const [loggedInUser] = useRecoilState(loggedInUserAtom)
  const [{ data: students }] = useGetMyStudentsQuery({ variables: { teacherId: loggedInUser?.id || "0" } })
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const handleStudentSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (students?.students){
      setSearchResults(students?.students?.filter((student) => student?.name?.toLowerCase().includes(e.target.value.toLowerCase())))
    }
  }
  const handleSortDirection = () => {
    if (sortDirection == "ASC") {
      setSortDirection("DESC")
    } else {
      setSortDirection("ASC")
    }
    const sortedResults = searchResults.sort((a, b) => {
      if (a.lastName && b.lastName) {
        switch(sortDirection) {
          case "ASC":
            if (a?.lastName < b?.lastName) {
              return -1;
            } else {
              return 1;
            }
          case "DESC":
          if (a?.lastName > b?.lastName) {
            return -1;
          } else {
            return 1;
          }
        }
      } else {
        return -1;
      }
    })
    if (sortedResults.length){
      setSearchResults(sortedResults)
    }
  }

  useEffect(() => {
    if (students?.students){
      setSearchResults(students.students)
    }
  }, [])
  const handleExport = () => {
    var headers = {
      id: "Id", // remove commas to avoid errors
      firstName: "First Name",
      lastName: "Last Name",
      portalId: "Portal Id"
    }
    var itemsFormatted: Student[] = []

    // format the data
    students?.students?.forEach((item) => {
      itemsFormatted.push({
        id: item.id, // remove commas to avoid errors,
        portalId: item.portalId,
        firstName: item.firstName,
        lastName: item.lastName,
      })
    })

    var fileTitle = "students-" + +new Date() // or 'my-unique-title'
    exportCSVFile(headers, itemsFormatted, fileTitle) // call the exportCSVFile() function to process the JSON and trigger the download
  }
  return (
    <Layout customTitle="My Students">
      
        <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
          <HStack spacing="3">
            <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />} onClick={handleExport}>
              Export
            </Button>
          </HStack>
        </Stack>

      <Stack spacing="5">
        <Box overflowX="auto">
          {!students?.students?.length ? (
            <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDir="column">
              <Text size="lg">You don't appear to have any grades entered yet.</Text>
              <Divider w="50%" my={10} />
              <Text>
                To start entering grades, click
                <Button variant={"link"}>
                  <Link to="/students">
                    {" "}
                    here
                  </Link>{" "}
                </Button>
              </Text>
            </Box>
          ) : (
            <List maxWidth="500px">
              <Flex>
              <Input placeholder="Search students" onChange={handleStudentSearch} mb={5} mr={5} />
              <IconButton aria-label="Sort Students" icon={sortDirection == "DESC" ? <FiArrowDown /> : <FiArrowUp />} onClick={handleSortDirection}>Sort</IconButton>
              </Flex>

              {searchResults?.map((student) => (
                <ListItem background="white" p={5} borderBottom="1px solid #f5f5f5" key={student.id}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box mr={10}>{student.name}</Box>
                    <Link to={`/student/${student.id}`}>
                      <Tooltip label="Manage courses">
                        <IconButton icon={<FiEdit2 fontSize="1.25rem" />} variant="ghost" aria-label="Edit Course" />
                      </Tooltip>
                    </Link>
                  </Flex>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Stack>
    </Layout>
  )
}