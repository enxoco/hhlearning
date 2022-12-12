import { Skeleton, Stack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import Layout from "#/components/Layout"
import AddParentModal from "./components/AddParentModal"
import AddStudentModal from "./components/AddStudentModal"
import ParentsActionBar from "./components/ParentsActionBar"
import StudentsList from "./components/StudentsList"
import Table from "./components/Table"
import TuitionStatusToggle from "./components/TuitionStatusToggle"
import { useGetAllParentsQuery } from "#/generated/graphql"

function Parents() {
  // Prevent the table from going back to page 1 after flipping a toggle switch.
  const [pauseQuery, doPauseQuery] = useState(false)
  const [{data, fetching, error}] = useGetAllParentsQuery({ pause: pauseQuery })
  const [parentName, setParentName] = useState("");
  const [parentId, setParentId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialData = [{ name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }, { name: "", firstName: "", lastName: "", email: "", student: [{ firstName: "", lastName: "" }] }]

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
          <StudentsList id={row.values.id} lastName={row.values.lastName} students={row.values.student} setParentId={setParentId} setParentName={setParentName} onOpen={onOpen} />
        ),
      },

      {
        Header: () => null,
        id: "actions",
        filter: null,
        isSorted: true,
        Cell: ({ row }) => (<ParentsActionBar id={row.values.id} portalId={row.values.portalId} email={row.values.email} />),
      },
      {
        Header: "Has Paid Tuition",
        accessor: "hasPaidTuition",
        canFilter: false,
        filter: false,
        Cell: ({ row }) => (
          <TuitionStatusToggle id={row.values.id} hasPaid={row.values.hasPaidTuition} doPauseQuery={doPauseQuery} />
        ),
      },
    ]

  return (
    <Layout customTitle="All Parents" description="">

      <AddParentModal />
      <AddStudentModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} lastName={parentName} parentId={parentId} setParentName={setParentName} setParentId={setParentId} />
      <Stack spacing="5">
        <Skeleton isLoaded={!fetching}>
          <Table columns={columns} data={data?.users || initialData} />
        </Skeleton>
      </Stack>
    </Layout>
  )
}

export default Parents
