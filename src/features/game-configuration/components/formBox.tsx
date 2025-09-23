import { Text, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormBoxProps {
  title: string,
  children: ReactNode,
}

export function FormBox({ title, children }: FormBoxProps) {
  return (
    <Flex flexDir='column' mt={4} border='1px solid darkgray' borderRadius='lg' p={4} pl={10} pr={10}>
      <Text fontSize='lg'>{title}</Text>
      {children}
    </Flex>

  )
}
