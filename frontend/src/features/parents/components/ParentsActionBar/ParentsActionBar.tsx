import { Student } from "#/generated/graphql";
import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Tooltip, IconButton, Link, useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import ManageStudentsButton from "../ManageStudentsButton/ManageStudentsButton";

interface IActionBarProps {
  id: string, portalId: string, email: string, students: Student[];
  setParentName: Dispatch<SetStateAction<string>>;
  setParentId: Dispatch<SetStateAction<string>>;
  lastName: string;
  onOpen: () => void;
}
export default function (props: IActionBarProps) {

  const toast = useToast();

  const handleSendPortalLink = async (id, email) => {
    (async () => {
      await fetch('/rest/portal-link', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, email })
      });

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

  const { id, students, setParentName, setParentId, onOpen, lastName, portalId, email } = props;
  return (
    <Flex key={id} justifyContent="space-between" display="flex" alignItems="center" >
      {/* This is the button that needs to trigger our modal and pass down props */}
      <ManageStudentsButton {...props} />
      <Tooltip label="View parent portal">
        <Link href={`${import.meta.env.DEV ? "http://localhost:8081/" : "/"}parents/${portalId}`} isExternal>
          <IconButton variant="ghost" _hover={{ background: "green", color: "white"}} aria-label="View parent portal" icon={<ExternalLinkIcon boxSize="1.5em" />} />
        </Link>
      </Tooltip>
      <Tooltip label='Send portal link email'>
        <IconButton icon={<EmailIcon boxSize="1.5em" />} variant="ghost" aria-label="Send Portal Link" onClick={() => handleSendPortalLink(id, email)} />
      </Tooltip>
    </Flex>
  )
}