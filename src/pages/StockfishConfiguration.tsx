
import { Badge, Field, Flex, IconButton, Input, Slider, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { StockfishColors } from "base/features/game-configuration/components/StockfishColors";
import { FormBox } from "base/features/game-configuration/components/formBox";
import { useStockfishConfiguration } from "base/features/game-configuration/hooks/useStockfishConfiguration";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StockfishConfiguration() {
  const navigate = useNavigate();
  const { stockfishConfigurationFormInputs, onSubmit } = useStockfishConfiguration();
  const { handleSubmit, control, watch } = stockfishConfigurationFormInputs;

  watch("strength", 10); // read current value for display

  return (
    <Flex flexDir="column" m={6}>
      <Flex as="form" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="end" justifyContent="space-between">
          <Text fontWeight="semibold">Configure Your Game Settings</Text>
        </Flex>

        <StockfishColors stockfishConfigurationForm={stockfishConfigurationFormInputs} />

        <FormBox title="Engine Strength">
          <Controller
            name="strength"
            control={control}
            defaultValue={10}
            render={({ field }) => (
              <Slider.Root
                min={0}
                max={20}
                step={1}
                value={[field.value ?? 10]}                       // slider wants number[]
                onValueChange={(details) => field.onChange(details.value[0])}
              >
                <Slider.Label mt={2}>
                  Adjust the engine skill level from 0 (weakest) to 20 (strongest)
                </Slider.Label>

                <Flex mt={6} justifyContent="space-between">
                  <Text fontWeight="semibold" mt={2} mb={2}>
                    Engine Strength: {field.value ?? 10}
                  </Text>
                  {GetBadge(field.value ?? 10)}
                </Flex>

                <Slider.Control mt={1}>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumbs />
                </Slider.Control>
              </Slider.Root>
            )}
          />
        </FormBox>

        <Flex flexDir="column" mt={4}>
          <Text fontSize="lg">Custom Starting Position</Text>
          <Flex mt={1} gap={6}>
            <Field.Root w="lg">
              <Field.Label fontWeight="semibold">Enter FEN (optional)</Field.Label>
              <Input
                p={2}
                bgColor="gray.700"
                placeholder="Enter FEN string"
                {...stockfishConfigurationFormInputs.register("fen")}
              />
            </Field.Root>
          </Flex>
        </Flex>

        <Flex alignSelf="end" mt={6} gap={6}>
          <IconButton onClick={() => navigate("/")} border="1px solid rgba(255, 255, 255, 0.3)" p={4}>
            <X />
            Cancel
          </IconButton>
          <IconButton type="submit" p={4} bgColor="gray.100" color="black">
            <Play />
            Start Game
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

function GetBadge(value: number) {
  if (value >= 0 && value < 4) return <Badge colorPalette="green">Beginner</Badge>;
  if (value >= 4 && value < 10) return <Badge colorPalette="blue">Intermediate</Badge>;
  if (value >= 10 && value < 17) return <Badge colorPalette="orange">Advanced</Badge>;
  if (value >= 17 && value < 21) return <Badge colorPalette="red">Impossible</Badge>;
  return null;
}

