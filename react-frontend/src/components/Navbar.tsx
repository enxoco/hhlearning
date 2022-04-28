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
  import * as React from 'react'
  import { Logo } from './Logo'
  import { Sidebar } from './Sidebar'
  import { ToggleButton } from './ToggleButton'
  
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
          <Image src="https://hhlearning.com/wp-content/uploads/2017/04/cropped-HH-Logo.png" />
          {/* <Logo /> */}
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
              <Sidebar />
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    )
  }