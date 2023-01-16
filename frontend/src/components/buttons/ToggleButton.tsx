import { useForgotPasswordMutation, User } from "#/generated/graphql";
import { Tooltip, IconButton, Button, FormControl, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";

export default function ToggleButton({ data, fetching, callback, label, condition }: { data: unknown, fetching: boolean, callback: () => void, label: string, condition: boolean}) {
//   const [fetchPasswordData, fetchPasswordReset] = useForgotPasswordMutation();
//   const [hideCheckMark, setHideCheckMark] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setHideCheckMark(true);
//     }, 2000)

//     return () => clearTimeout(timeout)
//   }, [data])


  return (
        <HStack spacing="1">
          <FormControl display="flex" alignItems="center">
              <Button disabled={fetching} colorScheme={condition ? "blue" : "gray"} borderRadius={0} onClick={callback}>Yes</Button>
              <Button disabled={fetching} colorScheme={!condition ? "blue" : "gray"} borderRadius={0} onClick={callback}>No</Button>
          </FormControl>
        </HStack>
  )
}