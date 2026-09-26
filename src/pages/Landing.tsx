import { Box, Button, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { GameModeCard } from "base/features/landing/components/GameModeCard";
import { HeroBoard } from "base/features/landing/components/HeroBoard";
import { Bot, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: '21', label: 'Engine levels' },
  { value: '4', label: 'Time controls' },
  { value: 'FEN', label: 'Custom positions' },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <Flex direction='column' flex={1}>
      <Grid
        as='section'
        templateColumns={{ base: '1fr', lg: '1.05fr 1fr' }}
        alignItems='center'
        gap={{ base: 12, lg: 16 }}
        maxW='1200px'
        w='full'
        mx='auto'
        px={{ base: 5, md: 8 }}
        pt={{ base: 10, md: 16, lg: 20 }}
        pb={{ base: 16, lg: 24 }}
      >
        <Flex direction='column' align='start' className='rise-in'>
          <Flex align='center' gap={2} px={3} py={1.5} borderRadius='full' border='1px solid' borderColor='gold.emphasized' bg='gold.subtle' fontSize='xs' fontWeight='medium' color='gold.200'>
            <Box w={1.5} h={1.5} borderRadius='full' bg='gold.400' />
            Full rules engine · Stockfish AI · Chess clocks
          </Flex>

          <Heading as='h1' mt={6} fontFamily='heading' fontWeight='600' fontSize={{ base: '5xl', md: '6xl', xl: '7xl' }} lineHeight='1.02' letterSpacing='-0.025em'>
            Play Chess.
            <Text as='span' display='block' color='gold.300' fontStyle='italic'>Your move.</Text>
          </Heading>

          <Text mt={6} fontSize={{ base: 'lg', md: 'xl' }} color='fg.muted' maxW='34rem'>
            Master the royal game. Pass the board to a friend, or test yourself against Stockfish, one of the strongest chess engines in the world.
          </Text>

          <Flex mt={9} gap={3} wrap='wrap'>
            <Button size='xl' colorPalette='gold' fontWeight='semibold' px={7} onClick={() => navigate('/configure/stockfish')}>
              <Bot /> Challenge Stockfish
            </Button>
            <Button size='xl' variant='outline' borderColor='border.emphasized' px={7} onClick={() => navigate('/configure/local')}>
              <Users /> Pass &amp; play
            </Button>
          </Flex>

          <Flex mt={12} gap={{ base: 8, md: 12 }}>
            {STATS.map((stat) => (
              <Box key={stat.label}>
                <Text fontFamily='heading' fontSize='3xl' fontWeight='600' lineHeight='1'>{stat.value}</Text>
                <Text mt={1.5} fontSize='sm' color='fg.muted'>{stat.label}</Text>
              </Box>
            ))}
          </Flex>
        </Flex>

        <Box
          className='rise-in'
          style={{ animationDelay: '120ms' }}
          justifySelf={{ base: 'center', lg: 'end' }}
          w='full'
          maxW='520px'
          p={{ base: 4, md: 5 }}
          borderRadius='3xl'
          bg='linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))'
          border='1px solid'
          borderColor='border'
          boxShadow='0 50px 120px -40px rgba(0, 0, 0, 0.9)'
        >
          <HeroBoard />
        </Box>
      </Grid>

      <Box as='section' maxW='1200px' w='full' mx='auto' px={{ base: 5, md: 8 }} pb={20}>
        <Flex direction='column' align='start' mb={8}>
          <Text fontSize='xs' fontWeight='semibold' letterSpacing='0.14em' textTransform='uppercase' color='gold.300'>Game modes</Text>
          <Heading as='h2' mt={2} fontFamily='heading' fontWeight='600' fontSize={{ base: '3xl', md: '4xl' }} letterSpacing='-0.02em'>Choose how you want to play</Heading>
        </Flex>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={5}>
          <GameModeCard
            icon={Users}
            title="Pass & Play"
            description="Two players, one device. The board turns to face whoever is on move."
            features={['Classical to bullet clocks', 'Draw offers & resignation', 'Start from any FEN position']}
            buttonText="Set up a local game"
            disableBtn={false}
            handleClick={() => navigate('/configure/local')}
          />
          <GameModeCard
            icon={Bot}
            title="vs Stockfish"
            description="Train against a world-class engine tuned anywhere from beginner to master."
            features={['21 strength levels', 'Play as white, black or random', 'Practice specific positions']}
            buttonText="Challenge the engine"
            disableBtn={false}
            handleClick={() => navigate('/configure/stockfish')}
            delayMs={80}
          />
          <GameModeCard
            icon={Globe}
            title="Online"
            description="Find opponents from around the world, track your rating and climb the leaderboard."
            features={['Real-time matchmaking', 'Rated games', 'Leaderboards']}
            buttonText="Coming soon"
            disableBtn={true}
            handleClick={() => undefined}
            delayMs={160}
          />
        </Grid>
      </Box>

      <Flex
        as='footer' mt='auto' direction={{ base: 'column', md: 'row' }} gap={2} justify='space-between' align={{ base: 'start', md: 'center' }}
        maxW='1200px' w='full' mx='auto' px={{ base: 5, md: 8 }} py={8} borderTop='1px solid' borderColor='border.muted' fontSize='sm' color='fg.subtle'
      >
        <Text>Built by Kyle Close with React, TypeScript &amp; Chakra UI.</Text>
        <Text>
          Piece set by{' '}
          <Link href='https://en.wikipedia.org/wiki/User:Cburnett/GFDL_images/Chess' target='_blank' rel='noreferrer' color='fg.muted' textDecoration='underline' textUnderlineOffset='3px'>
            Colin M.L. Burnett
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
