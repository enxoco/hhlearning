import Pagination from "#/components/Pagination";
import { useGetAllParentsQuery, useTogglePaidTuitionMutation } from "#/generated/graphql";
import usePagination from "#/hooks/usePagination";
import { Box, Flex, List, ListItem, Grid, Heading, Input, useDisclosure, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "#/features/layout/Layout";
import AddParentModal from "./components/AddParentModal";
import AddStudentModal from "./components/AddStudentModal";
import TableActions from "./components/ParentsActionBar";
import StudentsList from "./components/StudentsList";
import ColumnHeading from "./components/ColumnHeading";
import ToggleButton from "#/components/buttons/ToggleButton";

export type SortFields = "firstName" | "lastName" | "email" | "name"
export default function () {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortField, setSortField] = useState<SortFields>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [tuitionStatus, setTuitionStatus] = useTogglePaidTuitionMutation()
  const [{ data, fetching, error }, fetchParents] = useGetAllParentsQuery({ variables: { limit, offset, searchString: debouncedSearch, sortParams: { [sortField]: sortDirection } } });
  const [parentName, setParentName] = useState("");
  const [parentId, setParentId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagination, setPage] = usePagination({
    totalRecords: data?.usersCount,
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

  const columnHeadingProps = { sortDirection, sortField, setSortDirection, setSortField }

  return (
    <>
      <AddStudentModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        lastName={parentName}
        parentId={parentId}
        setParentName={setParentName}
        setParentId={setParentId}
        fetchParents={fetchParents} />
      <Layout customTitle="All Parents" description="">

        <Flex alignItems="center" justifyContent="space-between">
          <Input mt={5} name="name" placeholder="Search by name or email" maxWidth="500px" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <AddParentModal />
        </Flex>

        <Stack spacing="5">
          <Box p={0}>
            <List bgColor="white" p={5} border="1px solid #f5f5f5" borderRadius={10}>
              <ListItem mb={5} border="5px solid #f8fafc" p={5}>
                <Grid gridTemplateColumns="20% 10% 15% 20% auto auto" gridColumnGap={10}>
                  <ColumnHeading disableSort={false} fieldName="name" {...columnHeadingProps} />
                  <ColumnHeading disableSort={false} fieldName="lastName" {...columnHeadingProps} />
                  <ColumnHeading disableSort={false} fieldName="email" {...columnHeadingProps} />
                  <Heading size="xxs">Students</Heading>
                  <Heading size="xxs">Actions</Heading>
                  <Heading size="xxs">Has Paid</Heading>
                </Grid>
              </ListItem>
              {data?.users?.map((user) => (
                <ListItem key={user.id} border="5px solid #f8fafc" p={5}>
                  <Grid gridTemplateColumns="20% 10% 15% 20% auto auto" gridColumnGap={10}>
                    <Link to={`/families/${user.id}`}>
                      <Box textAlign="left" alignItems="center">{user.name}</Box>
                    </Link>
                    <Link to={`/families/${user.id}`}>
                      <Box textAlign="left" alignItems="center">{user.lastName}</Box>
                    </Link>
                    <Link to={`/families/${user.id}`}>
                      <Box textAlign="left" alignItems="center">{user.email}</Box>
                    </Link>
                    <StudentsList
                      id={user.id}
                      key={user.id}
                      students={user.student}

                    />
                    <TableActions
                      id={user.id}
                      email={user.email}
                      portalId={user.portalId}
                      students={user.student}
                      setParentName={setParentName}
                      onOpen={onOpen}
                      setParentId={setParentId} lastName={user.lastName}
                    />
                    <ToggleButton label="Has Paid Tuition" condition={user.hasPaidTuition} data={tuitionStatus.data} fetching={tuitionStatus.fetching} callback={() => setTuitionStatus({ id: user.id, hasPaid: !user.hasPaidTuition })} />

                  </Grid>
                </ListItem>

              ))}
              <ListItem mt={5}>
                <Pagination setPage={setPage} pagination={pagination} />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Layout>
    </>
  )
}