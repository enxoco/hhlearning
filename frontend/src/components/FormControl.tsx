
import { Button, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react"

import { useState } from 'react'
import { useUpdateSettingsMutation } from "#/generated/graphql"

const FormBlock = ({ id, name, value }) => {
    const [setting, updateSetting] = useUpdateSettingsMutation()
    const [initial, setInitial] = useState(value)

    const handleSaveForm = (e) => {
        e.preventDefault()
        updateSetting({ id, value: initial })
    }
    return (
        <FormControl>
            <FormLabel>{name}</FormLabel>
            <HStack>
                <Input name={name} value={initial} onChange={e => setInitial(e.target.value)} />
                <Button onClick={handleSaveForm}>Save</Button>
            </HStack>
        </FormControl>
    )
}

export default FormBlock