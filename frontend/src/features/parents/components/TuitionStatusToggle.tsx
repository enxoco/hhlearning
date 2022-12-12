import { Box, Switch } from "@chakra-ui/react";
import { useTogglePaidTuitionMutation } from "#/generated/graphql";
import { Dispatch, SetStateAction, useState } from "react";
export default function TuitionStatusToggle({ id, hasPaid, doPauseQuery }: { id: string; hasPaid: boolean; doPauseQuery: Dispatch<SetStateAction<boolean>> }){
    const [{ fetching }, setTuitionStatus] = useTogglePaidTuitionMutation()
    const [isChecked, setIsChecked] = useState(hasPaid);
    return (
        <Box key={id} display="flex" justifyContent="center" alignItems="center">
        <Switch disabled={fetching} isChecked={isChecked} onChange={(e) => {
          doPauseQuery(true)
          setIsChecked(e.target.checked)
          setTuitionStatus({ id, hasPaid: e.target.checked })

        }} />
      </Box>
    )

}