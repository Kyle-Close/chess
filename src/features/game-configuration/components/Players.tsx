import { Field, Flex, Input, IconButton, Text } from "@chakra-ui/react";
import { FormBox } from "./formBox";
import { Shuffle } from "lucide-react";

export function Players() {
  return (
    <FormBox title="Players">
      <Flex mt={2} gap={6}>
        <Flex>
          <Field.Root w='xs'>
            <Field.Label fontWeight='semibold'>Player 1 Name</Field.Label>
            <Input p={2} bgColor='gray.700' placeholder="Enter player 1 name" />
          </Field.Root>
        </Flex>
        <Flex>
          <Field.Root w='xs'>
            <Field.Label fontWeight='semibold'>Player 2 Name</Field.Label>
            <Input bgColor='gray.700' p={2} placeholder="Enter player 2 name" />
          </Field.Root>
        </Flex>
      </Flex>
      <IconButton mt={6} border='1px solid lightgray' maxW='12rem'>
        <Shuffle />
        <Text>Randomize Names</Text>
      </IconButton>
    </FormBox>

  )
}
