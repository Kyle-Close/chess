import { Box, chakra, Flex, Slider, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { ColorChoice } from "base/features/game-configuration/components/ColorChoice";
import { ConfigLayout } from "base/features/game-configuration/components/ConfigLayout";
import { FenField } from "base/features/game-configuration/components/FenField";
import { FormBox } from "base/features/game-configuration/components/formBox";
import { useStockfishConfiguration } from "base/features/game-configuration/hooks/useStockfishConfiguration";
import { getFenError, validateFen } from "base/features/game-configuration/utils/fen";
import { getStrengthTier } from "base/features/game-page/utils/players";

const TIERS = [
  { label: 'Beginner', from: 0 },
  { label: 'Intermediate', from: 4 },
  { label: 'Advanced', from: 10 },
  { label: 'Master', from: 17 },
];

export function StockfishConfiguration() {
  const { stockfishConfigurationFormInputs, onSubmit, newGameMutation } = useStockfishConfiguration();
  const { handleSubmit, control, watch, register, formState } = stockfishConfigurationFormInputs;

  const [playingAs, strength, fen] = watch(["playingAs", "strength", "fen"]);
  const tier = getStrengthTier(strength ?? 10);

  return (
    <ConfigLayout
      eyebrow="vs Stockfish"
      title="Challenge the engine"
      description="Stockfish is one of the strongest chess engines ever built. Dial its strength down to learn, or up to see how long you can survive."
      onSubmit={handleSubmit(onSubmit)}
      fen={fen}
      flipped={playingAs === "black"}
      summary={[
        { label: "You play", value: playingAs === "random" ? "Random color" : playingAs === "black" ? "Black" : "White" },
        { label: "Engine", value: `Level ${strength} · ${tier.label}` },
        { label: "Clock", value: "Untimed" },
        { label: "Start", value: fen?.trim() ? "Custom position" : "Standard" },
      ]}
      isPending={newGameMutation.isPending}
      error={newGameMutation.error}
    >
      <FormBox step={1} title="Your color" description="Choose which side you want to play.">
        <ColorChoice control={control} name="playingAs" label="Your color" />
      </FormBox>

      <FormBox step={2} title="Engine strength" description="Skill level from 0 (gentle) to 20 (full strength).">
        <Controller
          name="strength"
          control={control}
          render={({ field }) => (
            <Slider.Root
              min={0}
              max={20}
              step={1}
              colorPalette="gold"
              value={[field.value ?? 10]}
              onValueChange={(details) => field.onChange(details.value[0])}
            >
              <Flex align="end" justify="space-between" mb={5}>
                <Flex align="baseline" gap={3}>
                  <Slider.Label srOnly>Engine strength</Slider.Label>
                  <Text className="tabular" fontSize="5xl" fontWeight="bold" lineHeight="1">{field.value}</Text>
                  <Text fontSize="sm" color="fg.muted">/ 20</Text>
                </Flex>
                <Flex align="center" gap={2} px={3} py={1} borderRadius="full" fontSize="sm" fontWeight="semibold" style={{ color: tier.color, background: `${tier.color}1a`, border: `1px solid ${tier.color}40` }}>
                  <Box w={2} h={2} borderRadius="full" style={{ background: tier.color }} />
                  {tier.label}
                </Flex>
              </Flex>

              <Slider.Control>
                <Slider.Track h="6px" bg="ink.700">
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs boxSize={5} borderWidth="3px" borderColor="gold.400" bg="ink.950" />
              </Slider.Control>

              <Box position="relative" h={5} mt={3} fontSize="xs" color="fg.subtle">
                {TIERS.map((t) => (
                  <chakra.button
                    key={t.label}
                    type="button"
                    position="absolute"
                    style={{ left: `${(t.from / 20) * 100}%` }}
                    transform={t.from === 0 ? undefined : "translateX(-50%)"}
                    color={tier.label === t.label ? "fg" : undefined}
                    _hover={{ color: "fg" }}
                    onClick={() => field.onChange(t.from)}
                  >
                    {t.label}
                  </chakra.button>
                ))}
              </Box>
            </Slider.Root>
          )}
        />
      </FormBox>

      <FenField registration={register("fen", { validate: validateFen })} error={formState.errors.fen?.message ?? getFenError(fen)} />
    </ConfigLayout>
  );
}
