import { Box, Button, FormControl, HStack, Input, Stack, Text, Divider, Heading } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import Layout from "#/features/layout/Layout"
import { useFetchSettingsQuery, useUpdateSettingsMutation } from "#/generated/graphql"
import useDeleteCourses from "#/hooks/useDeleteCourses"
import useDocumentTitle from "#/utils/useDocumentTitle"

function Settings() {
  useDocumentTitle("Hilger Portal - Settings")

  const [retrievedSettings, fetchSettings] = useFetchSettingsQuery()
  const [updatedSetting, doUpdateSetting] = useUpdateSettingsMutation()
  const [semester, setSemester] = useState(null)
  const [archiveRunning, setArchiveRunning] = useState(false)

  const [isDeletingCourses, coursesDeletedSuccessfully, deleteCourses] = useDeleteCourses();
  const handleSemesterInput = (e) => {
    setSemester(e.target.value)
  }

  const handleUpdateSemester = () => {
    doUpdateSetting({ id: '1', value: semester })
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
        body: JSON.stringify({ email: "mikeconrad@onmail.com" })
      });
      const content = await rawResponse.body;
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
          <Box overflowX="auto" my={10}>
            <FormControl>
              <Heading size="md">Semester</Heading>
              <HStack>
                <Input defaultValue={semester?.value} onChange={handleSemesterInput} />
                <Button colorScheme="blue" px={10} onClick={handleUpdateSemester}>Save</Button>
              </HStack>
            </FormControl>


          </Box>
          <Divider my={5} />

          <Box overflowX="auto" my={10}>
            <FormControl>
              <Heading size="md">Archive Semester</Heading>
              <HStack>
                <Text>Click the button below to run an archive operation.  This will run through all of the students and save the latest version of their grades for this semester on the server.  You will receive an email once the operation has been completed.</Text>
                <Button colorScheme="blue" px={10} onClick={handleArchiveSemester} isLoading={archiveRunning}>Archive</Button>
              </HStack>
            </FormControl>


          </Box>
          <Divider my={5} />

          <Box my={10}>
            <Box>
              <Heading size="md">Delete grades</Heading>
              <HStack justifyContent="space-between">
                <Box>
                  <Text>This will delete all grades from the database.  There is no way to undo this action and it should only be done at the end of a semester.</Text>
                  <Text><strong>*This will not affect report cards that have already been saved.</strong></Text>
                </Box>

                <Button colorScheme="red" px={10} isLoading={isDeletingCourses} onClick={deleteCourses}>Delete grades</Button>

              </HStack>

            </Box>
          </Box>
        </Box>

      </Stack>
    </Layout>
  )
}

export default Settings
