import { Flex, RadioCard, HStack } from "@chakra-ui/react";
import { FormBox } from "./formBox";
import { UseFormReturn } from "react-hook-form";
import { LocalConfigurationFormInputs } from "../hooks/useConfiguration";
import { TimeControlType } from "base/zod/emums/TimeControl";

interface TimeControlProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>
}

export function TimeControl({ localConfigurationForm }: TimeControlProps) {
  return (
    <FormBox title="Time Control">
      <Flex mt={2} gap={6}>
        <RadioCard.Root defaultValue={TimeControlType.CLASSICAL.toString()}>
          <HStack mt={4} gap={6} align="stretch">
            {items.map((item) => (
              <RadioCard.Item border='1px solid white' key={item.value} value={item.value.toString()}>
                <RadioCard.ItemHiddenInput {...localConfigurationForm.register("timeControlType")} />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                    <RadioCard.ItemDescription>
                      {item.description}
                    </RadioCard.ItemDescription>
                  </RadioCard.ItemContent>
                  <RadioCard.ItemIndicator />
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </HStack>
        </RadioCard.Root>      </Flex>
    </FormBox>

  )
}

const items = [
  {
    value: TimeControlType.CLASSICAL,
    title: "60+30",
    description: "Classical"
  },
  {
    value: TimeControlType.RAPID,
    title: "10+10",
    description: "Rapid"
  },
  {
    value: TimeControlType.BLITZ,
    title: "3+2",
    description: "Blitz"
  },
  {
    value: TimeControlType.BULLET,
    title: "1+1",
    description: "Bullet"
  },
]
