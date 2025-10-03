import { SubmitHandler, useForm } from "react-hook-form";
import { TimeControlType } from "base/zod/emums/TimeControl";
import { useStartNewGame } from "base/features/api-utils/hooks/useStartNewGame";
import { Color } from "base/zod/emums/Color";

export type StockfishConfigurationFormInputs = {
  playingAs: string | number,
  strength: number,
  fen?: string
}


export function useStockfishConfiguration() {
  const newGameMutation = useStartNewGame();
  const stockfishConfigurationFormInputs = useForm<StockfishConfigurationFormInputs>();

  const onSubmit: SubmitHandler<StockfishConfigurationFormInputs> = data => handleSubmit(data);

  const handleSubmit = (data: StockfishConfigurationFormInputs) => {
    console.log(data)
    let sfColor: Color;
    switch (data.playingAs) {
      case "white":
        sfColor = Color.BLACK;
        break;
      case "black":
        sfColor = Color.WHITE;
        break;
      case "random":
        sfColor = GetRandomColor()
        break;
      default:
        throw new Error("Invalid color selected during stockfish configuration")
    }

    newGameMutation.mutate(
      {
        timeControlType: TimeControlType.NONE,
        fen: data.fen,
        stockfishStrength: data.strength,
        stockfishColor: sfColor
      }
    );
  }

  return {
    stockfishConfigurationFormInputs,
    onSubmit
  }
}

function GetRandomColor() {
  const num = Math.round(Math.random());
  if (num === 0) return Color.WHITE;
  else return Color.BLACK;
}
