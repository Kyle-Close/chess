import { Field, Flex, Input, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { LocalConfigurationFormInputs } from "../hooks/useConfiguration";

interface CustomProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>
}

export function Custom({ localConfigurationForm }: CustomProps) {
  return (

    <Flex flexDir='column' mt={4} >
      <Text fontSize='lg'>Custom Starting Position</Text>
      <Flex mt={1} gap={6}>
        <Field.Root w='lg'>
          <Field.Label fontWeight='semibold'>Enter FEN (optional)</Field.Label>
          <Input p={2} bgColor='gray.700' placeholder="Enter FEN string" {...localConfigurationForm.register("fen")} />
        </Field.Root>
      </Flex>
    </Flex>
  )
}
