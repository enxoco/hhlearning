import {
  Box,
  BoxProps,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

export interface IStatProps {
  label: string;
  value: number | string;
  boxProps?: BoxProps;
}

export const Stat = ({ label, value, boxProps }: IStatProps) => {
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      {...boxProps}
    >
      <Stack data-testid="statWrapper">
        <Text fontSize="sm" color="muted">
          {label}
        </Text>
        <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
          {value}
        </Heading>
      </Stack>
    </Box>
  );
};
