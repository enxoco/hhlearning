import { HStack, Tooltip, IconButton, Link, useToast } from "@chakra-ui/react";
import { FiLogIn, FiSend } from "react-icons/fi";

export default function ParentsActionBar({ id, portalId, email }: { id: string, portalId: string, email: string }){

  const toast = useToast();
  
  const handleSendPortalLink = async (id, email) => {
    (async () => {
      const rawResponse = await fetch('/rest/portal-link', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, email })
      });
      const content = await rawResponse.json();

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

    return (
        <HStack key={id} justifyContent="center" display="flex" alignItems="center" >
        <Tooltip label="View parent portal">
          <Link href={`${import.meta.env.DEV ? "http://localhost:8081/" : "/"}parents/${portalId}`} isExternal><IconButton aria-label="View parent portal" icon={<FiLogIn />}></IconButton></Link>
        </Tooltip>
        <Tooltip label='Send portal link email'>
          <IconButton icon={<FiSend fontSize="1.25rem" />} variant="ghost" aria-label="Send Portal Link" onClick={() => handleSendPortalLink(id, email)} />
        </Tooltip>
      </HStack>
    )
}