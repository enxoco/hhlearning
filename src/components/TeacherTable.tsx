import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Icon, IconButton, Switch, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react"
import * as React from "react"
import { useState } from "react"
import { FiEdit2, FiLogIn, FiSend } from "react-icons/fi"
import { IoArrowDown, IoArrowUp } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { searchTerm as searchTermAtom, students as studentAtom, loggedInUser, impersonateUser as impersonateUserAtom } from '../atom'
import {

  useForgotPasswordMutation,
  useToggleAdminMutation
} from "../generated/graphql"

function TeacherTable({studentProp, columns}) {
  const orderDirection = "asc"

  const [fetchStudents, setStudents] = useRecoilState(studentAtom)
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom)
  // No need to run our query if we already have students.
  const [user, setUser] = useRecoilState(loggedInUser)

  const [, fetchPasswordReset] = useForgotPasswordMutation()
  const [, toggleAdmin] = useToggleAdminMutation()
  const [impersonatedUser, setImpersonatedUser] = useRecoilState(impersonateUserAtom)

  async function handleRequestPasswordReset(email){
    const result = await fetchPasswordReset({email})
  }


  const [firstNameSort, setFirstNameSort] = useState("asc")
  const [lastNameSort, setLastNameSort] = useState("asc")
  function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}
  const handleFirstNameAsc = async () => {
    let sorted = [...studentProp]
    setStudents(sorted.sort(dynamicSort("firstName")))
    setFirstNameSort('desc')
  }

  const handleFirstNameDesc = async () => {

    let sorted = [...studentProp]
    setStudents(sorted.sort(dynamicSort("-firstName")))
    setFirstNameSort('asc')
  }

  const handleLastNameAsc = async () => {

    let sorted = [...studentProp]
    setStudents(sorted.sort(dynamicSort("lastName")))
    setLastNameSort('desc')
  }

  const handleLastNameDesc = async () => {

    let sorted = [...studentProp]
    setStudents(sorted.sort(dynamicSort("-lastName")))
    setLastNameSort('asc')
  }

  const handleFirstNameSort = () => {
    if (firstNameSort == "asc") {
      handleFirstNameAsc()
    } else {
      handleFirstNameDesc()
    }
  }

  const handleLastNameSort = () => {
    if (lastNameSort == "asc") {
      handleLastNameAsc()
    } else {
      handleLastNameDesc()
    }
  }

  function handleToggleAdmin (e,member) {
    toggleAdmin({id: member.id, isAdmin: e.target.checked})
  }


  async function impersonate(member) {
    await setImpersonatedUser(member)
    setUser(member)
  }


  return (
    <>
        
    <Table>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>Name</Text>
                <Button aria-label="sort" color="muted" onClick={handleFirstNameSort}>
                  <Icon as={firstNameSort === "asc" ? IoArrowDown : IoArrowUp} color="muted" boxSize="4" />
                </Button>
              </HStack>
            </HStack>
          </Th>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Email</Text>
                <Button aria-label="sort" color="muted" onClick={handleLastNameSort}>
                  <Icon as={lastNameSort === "asc" ? IoArrowDown : IoArrowUp} color="muted" boxSize="4" />
                </Button>
              </HStack>
            </HStack>
            </Th>
            <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Admin</Text>
              </HStack>
            </HStack>
          </Th>

          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {!studentProp
          ? null
          : studentProp.map((member) => {
              if (member.name.toLowerCase().includes(searchTerm.toLowerCase())) return (
              <Tr key={member.id}>
                <Td>
                  <HStack spacing="3">
                    <Checkbox />
                    <Box>
                      <Text fontWeight="medium">{member.firstName || member.name} {member.lastName || null }</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing="3">
                    <Box>
                      <Text fontWeight="medium">{member.email}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                <HStack spacing="1">
                  <FormControl display="flex" alignItems="center">
                      <Switch defaultChecked={member.isAdmin} onChange={(e) => handleToggleAdmin(e, member)} />
                    </FormControl>
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing="1">
                    <Tooltip label='Send password reset email'>
                      <IconButton icon={<FiSend fontSize="1.25rem" />} variant="ghost" aria-label="Send Password reset" onClick={() => handleRequestPasswordReset(member.email)} />
                    </Tooltip>
                    <Tooltip label='Impersonate Teacher'>
                    <IconButton icon={<FiLogIn fontSize="1.25rem" />} variant="ghost" aria-label="Impersonate Teacher" onClick={() => impersonate(member)} />
                    </Tooltip>
                  </HStack>
                </Td>
                <Td>

                </Td>

              </Tr>
            )})}
      </Tbody>
    </Table>
    </>
  )
}
export default TeacherTable
