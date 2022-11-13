import { HStack, IconButton, Skeleton, Stack, Switch, Text, Tooltip, useToast, Link } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { FiEdit2, FiLogIn, FiSend } from "react-icons/fi"
import { useRecoilState } from "recoil"
import { impersonateUser as impersonateUserAtom, loggedInUser } from "../atom"
import Layout from "../components/Layout"
import ParentTable from "../components/ParentTable"
import { useGetAllParentsQuery, useTogglePaidTuitionMutation, useForgotPasswordMutation } from "../generated/graphql"

function Parents () {
  // Prevent the table from going back to page 1 after flipping a toggle switch.
  const [pauseQuery, doPauseQuery] = useState(false)
  const [studentData] = useGetAllParentsQuery({pause: pauseQuery})
  const [, setTuitionStatus] = useTogglePaidTuitionMutation()
  const [, setImpersonatedUser] = useRecoilState(impersonateUserAtom)
  const [, setUser] = useRecoilState(loggedInUser)
  const [, fetchPasswordReset] = useForgotPasswordMutation()
  const toast = useToast()
  
  const handleSendPortalLink = async (id, email) => {
    (async () => {
      const rawResponse = await fetch('/rest/portal-link', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, email})
      });
      const content = await rawResponse.json();
    
      console.log(content);
      toast({
        title: 'Portal link email sent.',
        description: "Email sent to " + email,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
    })();
  }

  async function handleRequestPasswordReset(email){
    const result = await fetchPasswordReset({email})
    toast({
      title: 'Portal link email sent.',
      description: "Email sent to " + email,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top'
    })
  }
  function toggleTuitionStatus(e, parent) {
    e.preventDefault()
    doPauseQuery(true)
    setTuitionStatus({
      id: parent.id,
      hasPaid: !parent.hasPaidTuition,
    })
  }
  async function impersonate(member) {
    member.isParent = true

    await setImpersonatedUser(member)
    setUser(member)
  }

  const columns = useMemo(
    () => [
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
        accessor: "name",
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
          <Text>
            {row.values.student.map((student, index) => (
              <>
                {student.firstName}
                {index == row.values.student.length - 1 ? null : ", "}
              </>
            ))}
          </Text>
        ),
      },

      {
        Header: () => null,
        id: "actions",
        filter: null,
        isSorted: true,
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <>
            <HStack>
              {/* <Tooltip label="Manage courses">
                <IconButton icon={<FiEdit2 fontSize="1.25rem" />} variant="ghost" aria-label="Edit Course" />
              </Tooltip> */}
              <Tooltip label="View parent portal">
              <Link href={`${import.meta.env.DEV ? "http://localhost:8081" : null}/parents/${row.values.portalId}`} isExternal><IconButton icon={<FiLogIn />}></IconButton></Link>
              </Tooltip>
              <Tooltip label='Send portal link email'>
                <IconButton icon={<FiSend fontSize="1.25rem" />} variant="ghost" aria-label="Send Portal Link" onClick={() => handleSendPortalLink(row.values.id, row.values.email)} />
              </Tooltip>
            </HStack>
          </>
        ),
      },
      {
        Header: "Has Paid Tuition",
        accessor: "hasPaidTuition",
        canFilter: false,
        filter: false,
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <>
            <Switch defaultChecked={row.values.hasPaidTuition} onChange={(e) => {
              
              toggleTuitionStatus(e, row.values)
            }} />
          </>
        ),
      },
    ],
    []
  )

  return (
    <Layout customTitle="All Parents" description="">
      <Stack spacing="5">
        <Skeleton isLoaded={studentData?.data}>
          <ParentTable columns={columns} data={studentData?.data?.users || []} />
        </Skeleton>
      </Stack>
    </Layout>
  )
}

export default Parents
