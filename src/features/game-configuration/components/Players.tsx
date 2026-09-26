import { Button, Field, Grid, Input } from "@chakra-ui/react";
import { FormBox } from "./formBox";
import { Dices } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { LocalConfigurationFormInputs } from "../hooks/useLocalConfiguration";

interface PlayersProps {
  localConfigurationForm: UseFormReturn<LocalConfigurationFormInputs>,
  getRandomNames: () => [string, string]
}

export function Players({ localConfigurationForm, getRandomNames }: PlayersProps) {
  const { errors } = localConfigurationForm.formState;

  const handlePopulateNames = () => {
    const [p1, p2] = getRandomNames();
    localConfigurationForm.setValue("player1Name", p1, { shouldValidate: true })
    localConfigurationForm.setValue("player2Name", p2, { shouldValidate: true })
  }

  const inputProps = { h: 11, px: 3, bg: 'ink.850', borderColor: 'border.emphasized', colorPalette: 'gold', autoComplete: 'off' } as const;

  return (
    <FormBox
      step={1}
      title="Players"
      description="Who's sitting down at the board?"
      action={
        <Button size='sm' variant='ghost' color='fg.muted' onClick={handlePopulateNames}>
          <Dices /> Randomize
        </Button>
      }
    >
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4}>
        <Field.Root invalid={!!errors.player1Name}>
          <Field.Label fontSize='sm' color='fg.muted'>Player 1</Field.Label>
          <Input {...inputProps} placeholder="Enter a name" {...localConfigurationForm.register("player1Name", { required: "Enter a name for player 1", validate: (v) => v.trim() !== '' || "Enter a name for player 1" })} />
          {errors.player1Name && <Field.ErrorText>{errors.player1Name.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={!!errors.player2Name}>
          <Field.Label fontSize='sm' color='fg.muted'>Player 2</Field.Label>
          <Input {...inputProps} placeholder="Enter a name" {...localConfigurationForm.register("player2Name", { required: "Enter a name for player 2", validate: (v) => v.trim() !== '' || "Enter a name for player 2" })} />
          {errors.player2Name && <Field.ErrorText>{errors.player2Name.message}</Field.ErrorText>}
        </Field.Root>
      </Grid>
    </FormBox>
  )
}
