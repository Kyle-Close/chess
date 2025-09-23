import { Field, Flex, Input, IconButton, Text } from "@chakra-ui/react";
import { FormBox } from "./formBox";
import { Shuffle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { LocalConfigurationFormInputs } from "../hooks/useConfiguration";

interface PlayersProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>,
  getRandomName: () => string
}

export function Players({ localConfigurationForm, getRandomName }: PlayersProps) {
  const { errors } = localConfigurationForm.formState;

  const handlePopulateNames = () => {
    localConfigurationForm.setValue("player1Name", getRandomName())
    localConfigurationForm.setValue("player2Name", getRandomName())
  }

  return (
    <FormBox title="Players">
      <Flex mt={2} gap={6}>
        <Flex>
          <Field.Root w='xs' invalid={!!errors.player1Name}>
            <Field.Label fontWeight='semibold'>Player 1 Name</Field.Label>
            <Input p={2} bgColor='gray.700' placeholder="Enter player 1 name" {...localConfigurationForm.register("player1Name", { required: "Player names are mandatory" })} />
            {errors.player1Name && <Field.ErrorText>{errors.player1Name.message}</Field.ErrorText>}
          </Field.Root>
        </Flex>
        <Flex>
          <Field.Root w='xs' invalid={!!errors.player2Name}>
            <Field.Label fontWeight='semibold'>Player 2 Name</Field.Label>
            <Input bgColor='gray.700' p={2} placeholder="Enter player 2 name" {...localConfigurationForm.register("player2Name", { required: "Player names are mandatory" })} />
            {errors.player2Name && <Field.ErrorText>{errors.player2Name.message}</Field.ErrorText>}
          </Field.Root>
        </Flex>
      </Flex>
      <IconButton onClick={handlePopulateNames} mt={6} border='1px solid lightgray' maxW='12rem'>
        <Shuffle />
        <Text>Randomize Names</Text>
      </IconButton>
    </FormBox>

  )
}
