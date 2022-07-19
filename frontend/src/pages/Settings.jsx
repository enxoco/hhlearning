import { Box, Button, FormControl, FormLabel, HStack, Input, Stack, useBreakpointValue } from "@chakra-ui/react"
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

  const handleSemesterInput = (e) => {
    setSemester(e.target.value)
  }

  const handleUpdateSemester = () => {
    doUpdateSetting({id: 1, value: semester})
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
        </Box>

      </Stack>
    </Layout>
  )
}

export default Settings
