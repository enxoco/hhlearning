import { Stack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

import Layout from "#/features/layout/Layout"
import DeleteStudentModal from "./components/DeleteStudentModal/DeleteStudentModal"
import StudentTable from "./components/StudentTable/StudentTable"

export default function ({ isFormer }: { isFormer: boolean }) {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const {isOpen, onOpen, onClose} = useDisclosure();


  return (
    <Layout customTitle="All Students" description="">
      <DeleteStudentModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} studentId={studentId} studentName={studentName} />

      <Stack spacing="5" key={isFormer ? "active" : "inactive"} data-key={isFormer ? "active" : "inactive"}>
        <StudentTable isFormer={isFormer} />
      </Stack>
    </Layout>
  )
}