import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import * as React from 'react'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
 
interface UserProfileProps {
  name: string
  image: string
  email: string
}

export const UserProfile = (props: UserProfileProps) => {
    
  const { name, image, email } = props
  return (
    <HStack spacing="3" ps="2">
      <InitialsAvatar name={name} />
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="muted" fontSize="sm">
          {email}
        </Text>
      </Box>
    </HStack>
  )
}