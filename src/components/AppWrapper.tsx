import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { Provider } from '../components/ui/provider.tsx'
import { Toaster } from './ui/toaster.tsx';
import { useServerStatus } from 'base/features/api-utils/hooks/useServerStatus.ts';
import { Tooltip } from './ui/tooltip.tsx';
import knight from 'base/assets/pieces/bN.svg';

interface AppProps {
  children?: React.ReactNode;
}

function AppWrapper({ children }: AppProps) {
  return (
    <Provider>
      <Flex direction='column' flex={1} minH='100dvh'>
        <NavBar />
        <Flex as='main' direction='column' flex={1}>{children}</Flex>
      </Flex>
      <Toaster />
    </Provider>);
}

function NavBar() {
  return (
    <Flex
      as='header' h='64px' flexShrink={0} align='center' justify='space-between' px={{ base: 4, md: 8 }}
      borderBottom='1px solid' borderColor='border.muted' bg='rgba(12, 13, 16, 0.7)' backdropFilter='blur(12px)'
      position='sticky' top={0} zIndex='docked'
    >
      <RouterLink to='/' aria-label='Play Chess home'>
        <Flex align='center' gap={2.5}>
          <Flex w={8} h={8} align='center' justify='center' borderRadius='lg' bgGradient='to-br' gradientFrom='gold.300' gradientTo='gold.500' boxShadow='0 4px 14px rgba(228, 183, 94, 0.25)'>
            <img src={knight} alt='' style={{ width: 24, height: 24 }} />
          </Flex>
          <Text fontFamily='heading' fontSize='xl' fontWeight='600' letterSpacing='-0.01em'>Play Chess</Text>
        </Flex>
      </RouterLink>

      <Flex align='center' gap={{ base: 3, md: 5 }}>
        <ServerStatus />
        <Link href='https://github.com/Kyle-Close/chess' target='_blank' rel='noreferrer' color='fg.muted' _hover={{ color: 'fg' }} aria-label='Source on GitHub'>
          <FaGithub size={20} />
        </Link>
      </Flex>
    </Flex>
  );
}

const STATUS = {
  online: { label: 'Engine online', color: '#5fd49a', hint: 'The game server is awake and ready.' },
  waking: { label: 'Waking server', color: '#e4b75e', hint: 'The server sleeps when idle. The first request can take a few seconds.' },
  offline: { label: 'Server offline', color: '#e5736b', hint: "The game server couldn't be reached." },
};

function ServerStatus() {
  const status = STATUS[useServerStatus()];
  return (
    <Tooltip content={status.hint} openDelay={200}>
      <Flex align='center' gap={2} px={3} h={8} borderRadius='full' border='1px solid' borderColor='border' bg='ink.900' fontSize='xs' color='fg.muted' cursor='default'>
        <Box w={2} h={2} borderRadius='full' className='pulse-dot' style={{ background: status.color, color: status.color }} />
        <Text display={{ base: 'none', sm: 'block' }}>{status.label}</Text>
      </Flex>
    </Tooltip>
  );
}

export default AppWrapper;
