import Layout from "#/features/layout/Layout"
import { IColumnHeadingProps } from "#/types"
import useDocumentTitle from "#/utils/useDocumentTitle"
import { Button, HStack, Stack } from "@chakra-ui/react"
import { FiDownloadCloud } from "react-icons/fi"
import { Link } from "react-router-dom"
import ActionBar from "./components/ActionBar"
import AdminToggle from "#/components/AdminToggle"
import Table from "./components/Table"

export default function Teachers() {
  useDocumentTitle("Hilger Portal - Teachers")

  const columns: IColumnHeadingProps[] = [
    {fieldName: "name"},
    {fieldName: "email"},
    {fieldName: "isAdmin", element: AdminToggle },
    {fieldName: "actions", disableSort: true, element: ActionBar  }
  ]
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
      <Table tableHeading="Teachers" columnHeadings={columns} />
    </Layout>
  )
}