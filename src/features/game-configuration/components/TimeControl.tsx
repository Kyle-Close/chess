import { Controller, UseFormReturn } from "react-hook-form";
import { Flame, Hourglass, Timer, Zap } from "lucide-react";
import { FormBox } from "./formBox";
import { ChoiceCards } from "./ChoiceCards";
import { LocalConfigurationFormInputs } from "../hooks/useLocalConfiguration";
import { TIME_CONTROLS } from "base/features/game-page/utils/players";

interface TimeControlProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>
}

const ICONS = [Hourglass, Timer, Zap, Flame];

const OPTIONS = TIME_CONTROLS.map((tc, i) => {
  const Icon = ICONS[i];
  return { value: tc.value, label: `${tc.minutes} min`, sublabel: tc.name, icon: <Icon size={24} strokeWidth={1.75} /> };
});

export function TimeControl({ localConfigurationForm }: TimeControlProps) {
  return (
    <FormBox step={3} title="Time control" description="Each player gets this much time for the whole game.">
      <Controller
        control={localConfigurationForm.control}
        name="timeControlType"
        render={({ field }) => <ChoiceCards label="Time control" options={OPTIONS} value={field.value} onChange={field.onChange} columns={4} />}
      />
    </FormBox>
  )
}
