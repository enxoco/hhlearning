import {
    Box,
    BoxProps,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react'
  import {useCheckLoginQuery, useGetMyProfileQuery} from "#/generated/graphql"

  export const PersonalInfoCard = (props: BoxProps) => {
    const [me] = useCheckLoginQuery()
    const [profile] = useGetMyProfileQuery({variables: {id: me.data?.authenticatedItem.id}, pause: !me.data?.authenticatedItem})
    const {name, firstName, lastName, city, street, state, zipcode} = profile.data?.user
      return (
        <Box
          as="form"
          bg="bg-surface"
          boxShadow={useColorModeValue('sm', 'sm-dark')}
          borderRadius="lg"
          {...props}
        >
          <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
            <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input defaultValue={firstName || name} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input defaultValue={lastName} />
              </FormControl>
            </Stack>
            <FormControl id="street">
              <FormLabel>Street</FormLabel>
              <Input defaultValue={street} />
            </FormControl>
            <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input defaultValue={city} />
              </FormControl>
              <FormControl id="state">
                <FormLabel>State / Province</FormLabel>
                <Input defaultValue={state} />
              </FormControl>
              <FormControl id="zip">
                <FormLabel>ZIP/ Postal Code</FormLabel>
                <Input defaultValue={zipcode} />
              </FormControl>
            </Stack>
          </Stack>
          <Divider />
          <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Flex>
        </Box>
      )
  }