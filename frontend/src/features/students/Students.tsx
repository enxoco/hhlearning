import { Button, HStack, Stack, useDisclosure } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { FiDownloadCloud } from "react-icons/fi"
import { Link } from "react-router-dom"

import Layout from "#/components/Layout"
import StudentTable from "#/features/students/components/StudentTable"
import { Student, useGetAllStudentsQuery } from "#/generated/graphql"
import { exportCSVFile } from "#/utils/csvExport"
import DeleteStudentModal from "./components/DeleteStudentModal"
import TableActions from "./components/TableActions"


const Students = ({ isFormer }: { isFormer: boolean }) => {
  const [studentData] = useGetAllStudentsQuery({ variables: { limit: 1000, offset: 0, isFormer } })
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columns = useMemo(
    () => [

      {
        Header: () => null,
        accessor: "portalId"
      },
      {
        Header: () => null,
        accessor: "isFormer"
      },
      {
        Header: () => null,
        accessor: "id",
      },
      {
        Header: () => null,
        accessor: "firstName",
      },
      {
        Header: () => null,
        accessor: "lastName",
        filter: "fuzzyText",
      },
      {
        Header: "Name",
        accessor: "name",
        filter: "fuzzyText",
        Cell: ({ row }: { row: { values: Student } }) => <Link to={"/student/" + row.values.id}>{row.values.name}</Link>,
      },
      {
        Header: () => null,
        id: "actions",
        filter: null,
        isSorted: true,
        Cell: ({ row }: { row: { values: Student } }) => <TableActions onOpen={onOpen} setStudentId={setStudentId} studentId={studentId} studentName={studentName} setStudentName={setStudentName} id={row.values.id} isFormer={row.values.isFormer || false} name={row.values.name || ""} />,
      },
    ],
    []
  )
  const handleExport = () => {
    var headers = {
      id: "Id", // remove commas to avoid errors
      firstName: "First Name",
      lastName: "Last Name",
    }
    var itemsFormatted: Student[] = []

    if (studentData.data?.students) {
      // format the data
      studentData?.data?.students.forEach((item) => {
        itemsFormatted.push({
          id: item.id, // remove commas to avoid errors,
          firstName: item.firstName,
          lastName: item.lastName,
        })
      })
    }

    var fileTitle = "all-students_" + +new Date() // or 'my-unique-title'
    exportCSVFile(headers, itemsFormatted, fileTitle) // call the exportCSVFile() function to process the JSON and trigger the download
  }
  return (
    <Layout customTitle="All Students" description="">
      <DeleteStudentModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} studentId={studentId} studentName={studentName} />
      <Stack spacing="4" direction={{ base: "column", lg: "row" }} justify="space-between" align={{ base: "start", lg: "center" }}>
        <HStack spacing="3">
          <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />} onClick={handleExport}>
            Export
          </Button>
          <Link to="/add-student">
            <Button variant="primary">Add Student</Button>
          </Link>
        </HStack>
      </Stack>

      <Stack spacing="5" key={isFormer ? "active" : "inactive"}>
        <StudentTable columns={columns} data={studentData.data?.students || []} />
      </Stack>
    </Layout>
  )
}

export default Students
