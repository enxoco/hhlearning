import { useQuery } from "urql";

export default function useSearchStudentByName(firstName, parentLastName){
    const SearchStudentsByLastNameQuery = `
    query FindStudentsByParent($where: StudentWhereInput!){
      students(where: $where){
        name
        id
      }
    }
    `;

    const [result, reexcuteQuery] = useQuery({
        query: SearchStudentsByLastNameQuery,
        variables: {firstName, parentLastName}
      })
      return [result, reexcuteQuery]

//   const getStudents = (firstName, parentLastName) => {
//     const [result, reexcuteQuery] = useQuery({
//       query: SearchStudentsByLastNameQuery,
//       variables: {firstName, parentLastName}
//     })
//     return [result, reexcuteQuery]
//   }

//   return [getStudents]

}