import { useEffect, useState } from "react";
import { Student } from "#/generated/graphql";

export default function useGetStudent( id: string ) {
    const [student, setStudent] = useState<Student>();

    const GET_STUDENT_QUERY = `
    query GetStudent($id: ID!) {
        student(where: {id: $id}) {
            __typename
            id
            firstName
            lastName
            portalId
        }
    }`
    const fetchStudent = () => {
        fetch("/api/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "query": GET_STUDENT_QUERY, "variables": { id } })
        })
        .then((response) => response.json())
        .then((data) => console.log("data", data))
        .catch((e) => console.log("e", e))
    }

    useEffect(() => {
        fetchStudent
    }, [])
}