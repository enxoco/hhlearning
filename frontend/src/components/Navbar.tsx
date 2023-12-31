import { loggedInUser } from '#/atom'
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    useColorModeValue,
    useDisclosure,
    Image
  } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

  import Sidebar from './Sidebar'
  import { ToggleButton } from './ToggleButton'
  const [user] = useRecoilState(loggedInUser);
  export const Navbar = () => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    return (
      <Box
        width="full"
        py="4"
        px={{ base: '4', md: '8' }}
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <Flex justify="space-between">

          <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            isFullHeight
            preserveScrollBarGap
            // Only disabled for showcase
            trapFocus={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              <Sidebar user={user} path={location.pathname} />
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    )
  }