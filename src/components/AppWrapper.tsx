import { Flex } from '@chakra-ui/react';
import { Provider } from '../components/ui/provider.tsx'

interface AppProps {
  children?: React.ReactNode;
}

function AppWrapper({ children }: AppProps) {
  return (
    <Provider>
      <Flex bg='gray.900' justify='center' grow='1'>{children}</Flex>
    </Provider>);
}

export default AppWrapper;
