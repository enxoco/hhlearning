import { loggedInUser } from "#/atom";
import ToggleButton from "#/components/buttons/ToggleButton";
import Pagination from "#/components/Pagination";
import { useGetAllStudentsQuery, useToggleStudentActiveStatusMutation } from "#/generated/graphql";
import usePagination from "#/hooks/usePagination";
import { Box, List, ListItem, Grid, Heading, Input, Skeleton, GridItem, useDisclosure, FormControl } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TableActions from "./TableActions";

export default function StudentTable({ isFormer }: { isFormer: boolean }) {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchString);
  const [{ data, error, fetching }, fetchStudents] = useGetAllStudentsQuery({ variables: { limit, offset, isFormer, search: debouncedSearch } });
  const isLoggedIn = useRecoilValue(loggedInUser)
  const [toggleStudent, toggleActiveStudent] = useToggleStudentActiveStatusMutation()

  const [pagination, setPage] = usePagination({
    totalRecords: data?.studentsCount,
    initialPage: 1,
    defaultLimit: limit
  });
  useEffect(() => {
    if (limit != pagination?.limit) {
      setLimit(pagination?.limit);
    }
    if (offset != pagination?.offset) {
      setOffset(pagination?.offset)
    }
  }, [pagination?.currentPage, pagination?.limit])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncedSearch != searchString) {
        setDebouncedSearch(searchString)
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [searchString])
  if (fetching) {
    return <Skeleton isLoaded={!fetching} />
  }

  return (
    <Box p={0}>
      <List bgColor="white" p={5} border="1px solid #f5f5f5" borderRadius={10}>
        <ListItem mb={5} border="5px solid #f8fafc" p={5}>
          <Grid gridTemplateColumns="50% auto auto" gridColumnGap={10}>
            <Box mr={10}>
              <Heading size="xxs">Name</Heading>
              <Input mt={5} name="name" placeholder="Search by name" defaultValue={searchString} onChange={(e) => setSearchString(e.target.value)} />
            </Box>
            <Box>Actions</Box>
            <Box>Current Student</Box>
          </Grid>
        </ListItem>
        {data.students.map((student) => (
          <ListItem key={student.id} border="5px solid #f8fafc" p={5}>
            <Grid gridTemplateColumns="50% auto auto" gridColumnGap={10} gridRowGap={10} mb={5}>
              <Link to={`/student/${student.id}`}>
                <Box textAlign="left" alignItems="center">{student.name}</Box>
              </Link>
              <GridItem>
                <TableActions student={student} />
              </GridItem>
              <GridItem>
                {isLoggedIn.isAdmin && (
                  <FormControl display="flex" alignItems="center">
                    <ToggleButton condition={!student.isFormer} data={toggleStudent.data} fetching={toggleStudent.fetching} label="Is Active" callback={() => toggleActiveStudent({ id: student.id, isFormer: !isFormer })} />
                  </FormControl>
                )}
              </GridItem>
            </Grid>
          </ListItem>

        ))}
        <ListItem mt={5}>
          <Pagination setPage={setPage} pagination={pagination} />
        </ListItem>
      </List>
    </Box>
  )
}