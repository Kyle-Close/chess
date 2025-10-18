import { Flex } from '@chakra-ui/react';
import { Provider } from '../components/ui/provider.tsx'
import { useEffect } from 'react';
import { BASE_URL } from 'base/features/api-utils/baseUrl.ts';

interface AppProps {
  children?: React.ReactNode;
}

function AppWrapper({ children }: AppProps) {

  // Initially ping the server in case it's sleeping. Avoids a slow request later when trying to create a game
  useEffect(() => {
    fetch(`${BASE_URL}/ping`, { cache: 'no-store', keepalive: true });
  }, [])

  return (
    <Provider>
      <Flex bg='gray.900' justify='center' grow='1'>{children}</Flex>
    </Provider>);
}

export default AppWrapper;
