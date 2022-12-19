import { Box, HStack, List, ListItem, Skeleton, Stack, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Layout from "#/components/Layout"
import AddParentModal from "./components/AddParentModal"
import AddStudentModal from "./components/AddStudentModal"
import ParentsActionBar from "./components/ParentsActionBar"
import StudentsList from "./components/StudentsList"
import Table from "./components/Table"
import TuitionStatusToggle from "./components/TuitionStatusToggle"
import { useGetAllParentsQuery } from "#/generated/graphql"
import { ArrowUpIcon } from "@chakra-ui/icons"

function Parents() {
  // Prevent the table from going back to page 1 after flipping a toggle switch.
  const initialData = [{ name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }]
  const [pauseQuery, doPauseQuery] = useState(false);
  const [{data, fetching, error}, fetchParents] = useGetAllParentsQuery({ pause: pauseQuery });
  const [parents, setParents] = useState(data?.users || initialData);
  const [initialFetch, setInitialFetch] = useState(true);
  const [parentName, setParentName] = useState("");
  const [parentId, setParentId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (parents[0] && parents[0].name == "" && initialFetch && data?.users) {
      setParents(data.users);
      setInitialFetch(false);
    }
  },[data])

  useEffect(() => {
    if (data?.users) {
      setParents(data.users)
    }
  }, [data?.users])


  const columns = [
      {
        Header: () => null,
        accessor: "id",
      },
      {
        Header: () => null,
        accessor: "portalId"
      },
      {
        Header: () => "First Name",
        accessor: "name"
      },
      {
        Header: () => "Last name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Students",
        accessor: "student",
        Cell: ({ row }) => (
          <StudentsList fetchParents={fetchParents} key={`studentList-${row.values.id}`} id={row.values.id} lastName={row.values.lastName} students={row.values.student || []} setParentId={setParentId} setParentName={setParentName} onOpen={onOpen} />
        ),
      },

      {
        Header: () => null,
        id: "actions",
        filter: null,
        isSorted: true,
        Cell: ({ row }) => (<ParentsActionBar id={row.values.id} key={`actionBar-${row.values.id}`} portalId={row.values.portalId} email={row.values.email} />),
      },
      {
        Header: "Has Paid Tuition",
        accessor: "hasPaidTuition",
        canFilter: false,
        filter: false,
        Cell: ({ row }) => (
          <TuitionStatusToggle key={`tuitionStatus-${row.values.id}`} id={row.values.id} hasPaid={row.values.hasPaidTuition} doPauseQuery={doPauseQuery} />
        ),
      },
    ]

  return (
    <Layout customTitle="All Parents" description="">

      <AddParentModal />
      <AddStudentModal
        onOpen={onOpen} 
        isOpen={isOpen} 
        onClose={onClose} 
        lastName={parentName} 
        parentId={parentId} 
        setParentName={setParentName} 
        setParentId={setParentId}
        fetchParents={fetchParents} />
      <Stack spacing="5">
        <Skeleton isLoaded={!fetching}>
          <Table columns={columns} data={parents} />
        </Skeleton>
      </Stack>
    </Layout>
  )
}

export default Parents
