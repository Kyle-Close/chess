import { LocalGameSetupFormInputs } from 'base/features/game-settings/hooks/useGameSettings';
import { TimeControl } from 'base/redux/slices/gameSettings';
import { UseFormRegister } from 'react-hook-form';
import { SelectItem, SelectValueText, createListCollection } from '@chakra-ui/react';
import { SelectContent, SelectLabel, SelectRoot, SelectTrigger } from 'base/components/ui/select';


interface TimeControlsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function TimeControls({ register }: TimeControlsProps) {
  return (
    <SelectRoot collection={timeControls} className='flex flex-col my-2 gap-4'{...register('selectedTimeControl')}>
      <SelectLabel>Time Control</SelectLabel>

      <SelectTrigger>
        <SelectValueText>Select Time Control</SelectValueText>
      </SelectTrigger>

      <SelectContent>
        {timeControls.items.map((timeControl) => (
          <SelectItem item={timeControl} key={timeControl.value}>{timeControl.label}</SelectItem>
        ))}
      </SelectContent>

    </SelectRoot>
  );
}

const timeControls = createListCollection({
  items: [
    { label: "Free Play", value: TimeControl.FREE_PLAY },
    { label: "Blitz", value: TimeControl.BLITZ },
    { label: "Rapid", value: TimeControl.RAPID },
    { label: "Classical", value: TimeControl.CLASSICAL },
  ],
})
