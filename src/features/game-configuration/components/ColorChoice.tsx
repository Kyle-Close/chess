import { Box } from "@chakra-ui/react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Color } from "base/zod/emums/Color";
import { PieceType } from "base/zod/emums/PieceType";
import { getPieceSrc } from "base/features/game-board/utils/pieceAssets";
import { ChoiceCards } from "./ChoiceCards";

const king = (color: Color) => <img src={getPieceSrc(PieceType.KING, color)} alt='' style={{ width: 36, height: 36 }} />;

const OPTIONS = [
  { value: 'white', label: 'White', sublabel: 'Moves first', icon: king(Color.WHITE) },
  { value: 'black', label: 'Black', sublabel: 'Moves second', icon: king(Color.BLACK) },
  {
    value: 'random',
    label: 'Random',
    sublabel: 'Coin toss',
    icon: (
      <Box position='relative' w='44px' h='36px'>
        <Box position='absolute' left={0} top={0}>{king(Color.WHITE)}</Box>
        <Box position='absolute' right={0} top={0} style={{ clipPath: 'inset(0 0 0 50%)' }}>{king(Color.BLACK)}</Box>
      </Box>
    ),
  },
];

interface ColorChoiceProps<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  label: string
}

export function ColorChoice<T extends FieldValues>({ control, name, label }: ColorChoiceProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <ChoiceCards label={label} options={OPTIONS} value={field.value} onChange={field.onChange} />}
    />
  )
}
