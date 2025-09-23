import { Field, Flex, Input, Text } from "@chakra-ui/react";

export function Custom() {
  return (

    <Flex flexDir='column' mt={4} >
      <Text fontSize='lg'>Custom Starting Position</Text>
      <Flex mt={1} gap={6}>
        <Field.Root w='lg'>
          <Field.Label fontWeight='semibold'>Enter FEN (optional)</Field.Label>
          <Input p={2} bgColor='gray.700' placeholder="Enter FEN string" />
        </Field.Root>
      </Flex>
    </Flex>
  )
}
