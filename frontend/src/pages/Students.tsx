import { Button, HStack, IconButton, Stack, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Switch, FormLabel, FormControl } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { FiDownloadCloud, FiEdit2, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"

import Layout from "../components/Layout"
import StudentTable from "../components/StudentTable"
import { useGetAllStudentsQuery, useDeleteStudentMutation, useUpdateStudentInfoMutation, useToggleStudentActiveStatusMutation } from "../generated/graphql"
import { exportCSVFile } from "../utils/csvExport"

const Students = ({ isFormer }: {isFormer: boolean}) => {
  const [studentData, getStudentData] = useGetAllStudentsQuery({ variables: { limit: 1000, offset: 0, isFormer } })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [studentId, setStudentId] = useState(null)
  const [studentName, setStudentName] = useState(null)
  const [deletedStudent, doDeleteStudent] = useDeleteStudentMutation()
  const [, toggleActiveStudent] = useToggleStudentActiveStatusMutation()

  const showDeleteModal = (id, name) => {
    setStudentId(id)
    setStudentName(name)
    onOpen()
  }

  const handleDeleteStudent = () => {
    doDeleteStudent({id: studentId})
    onClose()
  }
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
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <>
            <HStack spacing="1">
              <Link to={"/student/" + row.values.id}>{row.values.name}</Link>
            </HStack>
          </>
        ),
      },
      {
        Header: () => null,
        id: "actions",
        filter: null,
        isSorted: true,
        Cell: ({ row }) => {
          return (
            // Use Cell to render an expander for each row.
            // We can use the getToggleRowExpandedProps prop-getter
            // to build the expander.
              <HStack spacing="1" key={row.values.id} data-key={row.values.id}>
                <Link to={`/student/${row.values.id}`}>
                  <Tooltip label="Manage courses">
                    <IconButton icon={<FiEdit2 fontSize="1.25rem" />} variant="ghost" aria-label="Edit Course" />
                  </Tooltip>
                </Link>
  
                <Tooltip label="Delete student">
                  <IconButton icon={<FiTrash2 fontSize="1.25rem" />} variant="ghost" aria-label="Delete Student" onClick={() => showDeleteModal(row.values.id, row.values.name)} />
                </Tooltip>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="studentStatus">Active</FormLabel>

                    <Switch id="studentStatus" isChecked={row.values.isFormer === false} key={row.values.id} onChange={(e) => {
                      row.values.isFormer = !row.values.isFormer
                      toggleActiveStudent({ id: row.values.id, isFormer: row.values.isFormer });
                      getStudentData();
                    }}></Switch>
  
                </FormControl>
  
              </HStack>
          )
        },
      },
    ],
    []
  )

  const tableId = () => {
    switch(isFormer){
      case true:
        return 'inactive'
        break
      case false:
        return 'active'
        break
    }
  }

  const handleExport = () => {
    var headers = {
      id: "Id", // remove commas to avoid errors
      firstName: "First Name",
      lastName: "Last Name",
    }
    var itemsFormatted = []

    // format the data
    studentData?.data?.students.forEach((item) => {
      itemsFormatted.push({
        id: item.id, // remove commas to avoid errors,
        firstName: item.firstName,
        lastName: item.lastName,
      })
    })

    var fileTitle = "all-students_" + +new Date() // or 'my-unique-title'
    exportCSVFile(headers, itemsFormatted, fileTitle) // call the exportCSVFile() function to process the JSON and trigger the download
  }
  return (
    <Layout customTitle="All Students" description="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you really want to delete {studentName}?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteStudent}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

      <Stack spacing="5" key={isFormer ? "active" : "inactive"} data-key={isFormer ? "active" : "inactive"}>
        <StudentTable columns={columns} data={studentData.data?.students || []} />
      </Stack>
    </Layout>
  )
}

export default Students
