import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import logo from "#/logo.png"
export default function (props: HTMLChakraProps<'img'>) {
  return (
    <chakra.img
      src={logo}
      alt="Hilger Higher Learning Logo"
      width={300}
      {...props}
    />
  )
}

