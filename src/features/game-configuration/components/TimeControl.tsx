import { Flex, RadioCard, HStack } from "@chakra-ui/react";
import { FormBox } from "./formBox";

export function TimeControl() {
  return (
    <FormBox title="Time Control">
      <Flex mt={2} gap={6}>
        <RadioCard.Root defaultValue="classical">
          <HStack mt={4} gap={6} align="stretch">
            {items.map((item) => (
              <RadioCard.Item border='1px solid white' key={item.value} value={item.value}>
                <RadioCard.ItemHiddenInput />
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
    value: "classical",
    title: "60+30",
    description: "Classical"
  },
  {
    value: "rapid",
    title: "10+10",
    description: "Rapid"
  },
  {
    value: "blitz",
    title: "3+2",
    description: "Blitz"
  },
  {
    value: "bullet",
    title: "1+1",
    description: "Bullet"
  },
]
