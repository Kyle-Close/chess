import { ColorChoice } from "base/features/game-configuration/components/ColorChoice";
import { ConfigLayout } from "base/features/game-configuration/components/ConfigLayout";
import { FenField } from "base/features/game-configuration/components/FenField";
import { FormBox } from "base/features/game-configuration/components/formBox";
import { Players } from "base/features/game-configuration/components/Players";
import { TimeControl } from "base/features/game-configuration/components/TimeControl";
import { useLocalConfiguration } from "base/features/game-configuration/hooks/useLocalConfiguration";
import { getFenError, validateFen } from "base/features/game-configuration/utils/fen";
import { TIME_CONTROLS } from "base/features/game-page/utils/players";

export function LocalConfiguration() {
  const { localConfigurationFormInputs, getRandomNames, onSubmit, newGameMutation } = useLocalConfiguration()
  const { watch, register, control, formState } = localConfigurationFormInputs;

  const [player1, player2, player1Color, timeControl, fen] = watch(["player1Name", "player2Name", "player1Color", "timeControlType", "fen"]);
  const p1 = player1?.trim() || "Player 1";
  const p2 = player2?.trim() || "Player 2";
  const tc = TIME_CONTROLS.find((t) => t.value === timeControl);

  const summary = player1Color === "random"
    ? [{ label: "Colors", value: `${p1} / ${p2}, drawn at random` }]
    : [
      { label: "White", value: player1Color === "white" ? p1 : p2 },
      { label: "Black", value: player1Color === "white" ? p2 : p1 },
    ];

  return (
    <ConfigLayout
      eyebrow="Pass & play"
      title="Set up a local game"
      description="Two players share this screen. The board turns after every move so each side plays from their own perspective."
      onSubmit={localConfigurationFormInputs.handleSubmit(onSubmit)}
      fen={fen}
      summary={[...summary, { label: "Clock", value: tc ? `${tc.minutes} min · ${tc.name}` : "–" }, { label: "Start", value: fen?.trim() ? "Custom position" : "Standard" }]}
      isPending={newGameMutation.isPending}
      error={newGameMutation.error}
    >
      <Players localConfigurationForm={localConfigurationFormInputs} getRandomNames={getRandomNames} />
      <FormBox step={2} title="Colors" description="Pick the side for player 1.">
        <ColorChoice control={control} name="player1Color" label="Player 1 color" />
      </FormBox>
      <TimeControl localConfigurationForm={localConfigurationFormInputs} />
      <FenField registration={register("fen", { validate: validateFen })} error={formState.errors.fen?.message ?? getFenError(fen)} />
    </ConfigLayout>
  )
}
