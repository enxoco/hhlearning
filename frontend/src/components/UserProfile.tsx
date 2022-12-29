import { Box, HStack, Text } from '@chakra-ui/react'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
 
type UserProfileProps = {
  name: string
  email: string
}

export default function UserProfile({ name, email }: UserProfileProps) {
    
  return (
    <HStack spacing="3" ps="2">
      <InitialsAvatar name={name} />
      <Box data-testid="userProfileBadge">
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