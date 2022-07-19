import { Box, Button, ButtonGroup, HStack, Icon, Input, InputGroup, InputLeftElement, Stack, Text, useBreakpointValue } from "@chakra-ui/react"

import { FiDownloadCloud, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { pageOffset as pageOffsetAtom, pageSize as pageSizeAtom, searchTerm as searchTermAtom, teachers as teachersAtom } from "../atom"
import Layout from "../components/Layout"
import TeacherTable from "../components/TeacherTable"
import { useGetAllTeachersQuery } from "../generated/graphql"
import useDocumentTitle from "../utils/useDocumentTitle"
const Teachers = () => {
  useDocumentTitle("Hilger Portal - Teachers")

  const isMobile = useBreakpointValue({ base: true, md: false })

  const [pageSize] = useRecoilState(pageSizeAtom)
  const [pageOffset, setPageOffset] = useRecoilState(pageOffsetAtom)
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom)

  const [studentData, getStudents] = useGetAllTeachersQuery({ variables: { limit: pageSize, offset: pageOffset } })

  function performPaginationForward() {
    setPageOffset(pageSize + pageOffset)
    getStudents()
  }

  function performPaginationPrevious() {
    let offset = pageOffset - pageSize
    setPageOffset(offset)

    getStudents({ limit: pageSize, offset: pageOffset })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <Layout>
      <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
        <HStack spacing="3">
          <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />}>
            Export
          </Button>
          <Link to="/add-teacher">
            <Button variant="primary">Add Teacher</Button>
          </Link>
        </HStack>
      </Stack>

      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack direction={{ base: "column", md: "row" }} justify="space-between">
            <Text fontSize="lg" fontWeight="medium">
              Teachers
            </Text>
            <InputGroup maxW="xs">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="muted" boxSize="5" />
              </InputLeftElement>
              <Input placeholder="Search" onChange={handleSearch} />
            </InputGroup>
          </Stack>
        </Box>
        <Box overflowX="auto">
          <TeacherTable studentProp={studentData?.data?.users} columns={["Name", "Email"]} />
        </Box>
        <Box px={{ base: "4", md: "6" }} pb="5">
          <HStack spacing="3" justify="space-between">
            {!isMobile && studentData?.data?.users && (
              <Text color="muted" fontSize="sm">
                Showing {pageOffset + 1} to {pageOffset + pageSize} of {studentData?.data?.users.length || null} results
              </Text>
            )}
            {studentData?.data?.users && studentData?.data?.users.length <= 10 ? null : (
              <ButtonGroup spacing="3" justifyContent="space-between" width={{ base: "full", md: "auto" }} variant="secondary">
                {pageOffset > 1 ? (
                  <Button value="previous" onClick={async () => await performPaginationPrevious()}>
                    Previous
                  </Button>
                ) : null}
                <Button value="next" onClick={() => performPaginationForward()}>
                  Next
                </Button>
              </ButtonGroup>
            )}
          </HStack>
        </Box>
      </Stack>
    </Layout>
  )
}

export default Teachers
