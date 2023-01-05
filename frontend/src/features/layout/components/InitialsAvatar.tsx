import { Box, HStack, Text } from '@chakra-ui/react'

type InitialsAvatarProps = {
  name: string
  email: string
}

export default function InitialsAvatar({ name, email }: InitialsAvatarProps) {
  const initials = [...new Set(name.replace(/ /g, "").split(/[a-z]/))].join("");
  return (
    <HStack spacing="3" ps="2">
      <div aria-label={name} role="img" className="initials-avatar"><div>{initials}</div></div>
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