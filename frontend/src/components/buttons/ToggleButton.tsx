import { Button, FormControl, HStack } from "@chakra-ui/react";

export default function ToggleButton({ data, fetching, callback, label, condition }: { data: unknown, fetching: boolean, callback: () => void, label: string, condition: boolean}) {

  return (
        <HStack spacing="1">
          <FormControl display="flex" alignItems="center">
              <Button disabled={fetching} colorScheme={condition ? "blue" : "gray"} borderRadius={0} onClick={callback}>Yes</Button>
              <Button disabled={fetching} colorScheme={!condition ? "blue" : "gray"} borderRadius={0} onClick={callback}>No</Button>
          </FormControl>
        </HStack>
  )
}