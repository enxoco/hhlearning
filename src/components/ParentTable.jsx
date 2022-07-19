// import { Button, HStack, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr,Box, CheckBox, Tooltip } from "@chakra-ui/react"
// import { matchSorter } from "match-sorter"
// import * as React from "react"
// import { IoArrowDown, IoArrowUp } from "react-icons/io5"
// import { Link } from "react-router-dom"
// import { useFilters, usePagination, useSortBy, useTable } from "react-table"
// import { useRecoilState } from "recoil"
// import {loggedInUser as loggedInUserAtom} from '../atom'
// import {InfoIcon} from '@chakra-ui/icons'
// // Create an editable cell renderer

// function ParentTable({ studentProp, searchTerm }) {

//     const [loggedInUser] = useRecoilState(loggedInUserAtom)

//   return (
//     <>
//     <Box overflowX="auto" width="100%">
//       {studentProp ? (
//         <TableContainer maxHeight="70vh" overflowY="scroll">
//           <Table overflow="scroll">
//             <Thead>
//               <Tr>
//                 <Th>
//                 First Names
//                 </Th>
//                 <Th>Last Name</Th>
//                 <Th>Email</Th>


//                 <Th></Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {!studentProp
//                 ? null
//                 : studentProp.map((student) => {
//                       return (
//                         <Tr key={student.id}>
//                           <Td>
//                             <HStack spacing="3">
//                               <Box>
//                                 <Link to={"/student/" + student.id}>
//                                   <Text fontWeight="medium">{student.firstName || student.name}</Text>
//                                 </Link>
//                               </Box>
//                             </HStack>
//                           </Td>
//                           <Td>
//                             <HStack spacing="3">
//                               <Box>
//                                 <Link to={"/student/" + student.id}>
//                                   <Text fontWeight="medium">{student.lastName}</Text>
//                                 </Link>
//                               </Box>
//                             </HStack>
//                           </Td>
//                           <Td>
//                             <HStack spacing="3">
//                               <Box>
//                                 <Link to={"/student/" + student.id}>
//                                   <Text fontWeight="medium">{student.email}</Text>
//                                 </Link>
//                               </Box>
//                             </HStack>
//                           </Td>

//                           <Td>
//                               {loggedInUser?.hasPaidTution ? (
//                                   <Button variant="primary">View Grades</Button>
//                               ) : (
//                                   <Tooltip label="It looks like you have an unpaid balance.">
//                                       <InfoIcon />
//                                   </Tooltip>
//                               )
//                               }
                            
//                           </Td>
//                         </Tr>
//                       )
                    
//                   })}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <>'Loading'</>
//       )}
//     </Box>

//                   </>
//   )
// }
// export default ParentTable
