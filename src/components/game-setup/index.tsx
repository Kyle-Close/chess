import { TabNavigation } from '../generic/TabNavigation';
import { ComputerSetup } from './ComputerSetup';
import { LocalSetup } from './Local/LocalSetup';
import { OnlineSetup } from './OnlineSetup';

export function GameSetup() {
  return (
    <div className='grid min-w-full p-6 rounded-lg'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='justify-self-center text-xl mb-5'>Game Setup</h1>
        <TabNavigation
          tabData={[
            { tabName: 'Local', tabContent: <LocalSetup />, isDisabled: false },
            { tabName: 'Computer', tabContent: <ComputerSetup />, isDisabled: true },
            { tabName: 'Online', tabContent: <OnlineSetup />, isDisabled: true },
          ]}
        />
      </div>
    </div>
  );
}
