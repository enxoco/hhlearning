import { useForgotPasswordMutation, User } from "#/generated/graphql";
import { Tooltip, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCheck, FiSend } from "react-icons/fi";

export const SendPasswordReset = ({ email }: { email: User["email"] }) => {
  const [fetchPasswordData, fetchPasswordReset] = useForgotPasswordMutation();
  const [hideCheckMark, setHideCheckMark] = useState(false);
  const handleRequestPasswordReset = () => {
    fetchPasswordReset({ email });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHideCheckMark(true);
    }, 2000)

    return () => clearTimeout(timeout)
  }, [fetchPasswordData.data])


  return (
    <>
      {fetchPasswordData.data && !hideCheckMark ? (<IconButton variant="ghost" icon={<FiCheck color="green" />} aria-label="Email sent" />) : (
        <Tooltip label="Send password reset email">
          <IconButton
            isLoading={fetchPasswordData.fetching}
            icon={<FiSend fontSize="1.25rem" />}
            variant="ghost"
            aria-label="Send Password reset"
            onClick={handleRequestPasswordReset}
          />
        </Tooltip>
      )}
    </>
  )
}