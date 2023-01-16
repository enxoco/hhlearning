import { Box, HStack, Text } from '@chakra-ui/react'

type UserProfileProps = {
  name: string
  email: string
}

export default function UserProfileBadge({ name, email }: UserProfileProps) {
  const initials = [...new Set(name.replace(/ /g, "").split(/[a-z]/))].join("");
  return (
    <HStack spacing="3" ps="2">
      <div aria-label={name} role="img" className="initials-avatar"><div>{initials}</div></div>
      <Box data-testid="userProfileBadge">
        <Text fontWeight="medium" fontSize="sm" role='paragraph'>
          {name}
        </Text>
        <Text color="muted" fontSize="sm" role="paragraph">
          {email}
        </Text>
      </Box>
    </HStack>
  )
}