import { SubmitHandler, useForm } from "react-hook-form";
import { usePlayers } from "./usePlayers";
import { TimeControlType } from "base/zod/emums/TimeControl";
import { useStartNewGame } from "base/features/api-utils/hooks/useStartNewGame";

export type LocalConfigurationFormInputs = {
  player1Name: string,
  player2Name: string,
  player1Color: string,
  timeControlType: string,
  fen?: string
}


export function useConfiguration() {
  const newGameMutation = useStartNewGame();
  const localConfigurationFormInputs = useForm<LocalConfigurationFormInputs>();
  const { getRandomName } = usePlayers();
  const onSubmit: SubmitHandler<LocalConfigurationFormInputs> = data => handleSubmit(data);

  const handleSubmit = (data: LocalConfigurationFormInputs) => {
    newGameMutation.mutate({ timeControlType: getTimeControlType(data.timeControlType), fen: data.fen });
  }

  return {
    localConfigurationFormInputs,
    onSubmit,
    getRandomName
  }
}

function getTimeControlType(timeControl: string) {
  switch (timeControl) {
    case "0":
      return TimeControlType.CLASSICAL;
    case "1":
      return TimeControlType.RAPID;
    case "2":
      return TimeControlType.BLITZ;
    case "3":
      return TimeControlType.BULLET;
    default:
      throw new Error('Invalid time control')
  }
}
