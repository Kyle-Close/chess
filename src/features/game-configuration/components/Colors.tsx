import { Flex, RadioCard, HStack, Icon } from "@chakra-ui/react";
import { FormBox } from "./formBox";
import { PaintBucket, Shuffle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { LocalConfigurationFormInputs } from "../hooks/useConfiguration";

interface ColorsProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>,
}

export function Colors({ localConfigurationForm }: ColorsProps) {
  return (
    <FormBox title="Colors">
      <Flex mt={2} gap={6}>
        <RadioCard.Root defaultValue="white">
          <RadioCard.Label>Select Player 1's Color</RadioCard.Label>
          <HStack mt={4} gap={6} align="stretch">
            {items.map((item) => (
              <RadioCard.Item flex='1 1 0' minWidth={0} border='1px solid white' key={item.value} value={item.value} >
                <RadioCard.ItemHiddenInput {...localConfigurationForm.register("player1Color")} />
                <RadioCard.ItemControl>
                  <RadioCard.ItemContent>
                    <Icon size="xl" color="fg.muted" mb="2">
                      {item.icon}
                    </Icon>
                    <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
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
    icon: <PaintBucket />,
    value: "white",
    title: "White",
  },
  {
    icon: <PaintBucket color="black" />,
    value: "black",
    title: "Black",
  },
  {
    icon: <Shuffle />,
    value: "random",
    title: "Random",
  },
]
