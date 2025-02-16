import { TabNavigation } from '../../components/TabNavigation';
import { ComputerSetup } from './ComputerSetup';
import { LocalSetup } from './local/LocalSetup';
import { OnlineSetup } from './online/OnlineSetup';

export function GameSetupPage() {
  return (
    <div className='grid min-w-full p-6 rounded-lg'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='justify-self-center text-xl mb-5'>Game Setup</h1>
        <TabNavigation
          tabData={[
            { tabName: 'Local', tabContent: <LocalSetup />, isDisabled: false },
            { tabName: 'Computer', tabContent: <ComputerSetup />, isDisabled: false },
            { tabName: 'Online', tabContent: <OnlineSetup />, isDisabled: true },
          ]}
        />
      </div>
    </div>
  );
}
