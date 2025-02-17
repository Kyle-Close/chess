import { Tabs } from '@chakra-ui/react';

export interface TabNavigation {
  tabName: string;
  tabContent: React.ReactNode;
  isDisabled: boolean;
}

interface TabNavigationProps {
  tabData: TabNavigation[];
}

export function TabNavigation({ tabData }: TabNavigationProps) {
  return (
    <Tabs.Root>
      <Tabs.List>
        {tabData.map((data, key) => <Tabs.Trigger value={data.tabName} key={key}>{data.tabName}</Tabs.Trigger>)}
      </Tabs.List>
      {tabData.map((data, key) => <Tabs.Content value={data.tabName} key={key}>{data.tabContent}</Tabs.Content>)}
    </Tabs.Root>
  );
}
