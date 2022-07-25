import { Box, Button, FormControl, FormLabel, HStack, Input, Stack, useBreakpointValue, Text } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import Layout from "../components/Layout"
import { useFetchSettingsQuery, useUpdateSettingsMutation } from "../generated/graphql"
import useDocumentTitle from "../utils/useDocumentTitle"

function Settings() {
  useDocumentTitle("Hilger Portal - Settings")

  const isMobile = useBreakpointValue({ base: true, md: false })
  const [retrievedSettings, fetchSettings] = useFetchSettingsQuery()
  const [updatedSetting, doUpdateSetting] = useUpdateSettingsMutation()
  const [semester, setSemester] = useState(null)
  const [ archiveRunning, setArchiveRunning] = useState(false)

  const handleSemesterInput = (e) => {
    setSemester(e.target.value)
  }

  const handleUpdateSemester = () => {
    doUpdateSetting({id: 1, value: semester})
  }

  const handleArchiveSemester = () => {
    (async () => {
      setArchiveRunning(true)

      const rawResponse = await fetch('/rest/archive', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: process.env.REACT_APP_ADMIN_TOKEN, email: "mikeconrad@onmail.com"})
      });
      const content = await rawResponse.body;
    
      console.log(content);
      // toast({
      //   title: 'Portal link email sent.',
      //   description: "Email sent to " + email,
      //   status: 'success',
      //   duration: 9000,
      //   isClosable: true,
      //   position: 'top'
      // })
      setArchiveRunning(false)
    })();
  }
  useEffect(() => {
    setSemester(retrievedSettings.data?.settings.filter(a => a.name == 'Semester')[0])
  }, [retrievedSettings.data])
  
  return (
    <Layout customTitle="Settings">
      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Box overflowX="auto">
            <FormControl>
              <FormLabel>Semester</FormLabel>
              <HStack>
                <Input defaultValue={semester?.value} onChange={handleSemesterInput} />
                <Button onClick={handleUpdateSemester}>Save</Button>
              </HStack>
            </FormControl>


          </Box>
          <Box overflowX="auto">
            <FormControl>
              <FormLabel>Archive Semester</FormLabel>
              <HStack>
                <Text>Click the button below to run an archive operation.  This will run through all of the students and save the latest version of their grades for this semester on the server.  You will receive an email once the operation has been completed.</Text>
                <Button onClick={handleArchiveSemester} isLoading={archiveRunning}>Archive</Button>
              </HStack>
            </FormControl>
            

          </Box>
        </Box>

      </Stack>
    </Layout>
  )
}

export default Settings
