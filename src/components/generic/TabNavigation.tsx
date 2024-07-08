import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export interface TabNavigation {
  tabName: string;
  tabContent: React.ReactNode;
  isDisabled: boolean;
}

interface TabNavigationProps {
  tabData: TabNavigation[];
}

export function TabNavigation({ tabData }: TabNavigationProps) {
  function createTabList() {
    return (
      <TabList borderBottomWidth={'1.5px'}>
        {tabData.map((data, key) => {
          return (
            <Tab isDisabled={data.isDisabled} fontWeight={500} borderWidth={'2px'} key={key}>
              {data.tabName}
            </Tab>
          );
        })}
      </TabList>
    );
  }

  function createTabPanelList() {
    return (
      <TabPanels>
        {tabData.map((data, key) => {
          return (
            <TabPanel paddingX={0} key={key}>
              {data.tabContent}
            </TabPanel>
          );
        })}
      </TabPanels>
    );
  }

  return (
    <Tabs variant='enclosed'>
      {createTabList()}
      {createTabPanelList()}
    </Tabs>
  );
}

// Need to know: array - tab name, tab content (html)
