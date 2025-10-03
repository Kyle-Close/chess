import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { GameModeCard } from "base/features/landing/components/GameModeCard";
import { CircleUser, Crown, Users, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <Flex w='full' justifyContent='center' alignItems='center'>
      <Flex flexDir='column' gap={16}>
        <Flex flexDir='column' alignItems='center' gap={4}>
          <Flex gap={4} alignItems='center'>
            <Icon >
              <Crown size={64} />
            </Icon>
            <Heading fontSize='5xl'>ChessPlay</Heading>
          </Flex>
          <Text textAlign='center' opacity='50%' maxW='1/2' fontSize='xl'>Master the royal game. Play locally with friends, challenge players worldwide, or test your skills against advanced AI.</Text>
        </Flex>

        <Flex m='0 20%' gap={2}>
          <GameModeCard
            icon={CircleUser}
            title="Local Play"
            description="Play with friends on the same device"
            extraDescription="Perfect for face-to-face games. Take turns on the same board and enjoy the classic chess experience."
            buttonText="Start Local Game"
            disableBtn={false}
            handleClick={() => navigate('/configure/local')}
          />
          <GameModeCard
            icon={Users}
            title="Online Play"
            description="Challenge players from around the world"
            extraDescription="Join the global chess community. Find opponents, track your rating, and climb the leaderboards. *Coming soon*"
            buttonText="Play Online"
            disableBtn={true}
            handleClick={() => navigate('/chess-api')}
          />
          <GameModeCard
            icon={Bot}
            title="AI Opponent"
            description="Train against intelligent computer players"
            extraDescription="Practice your skills with adjustable difficulty levels. Learn from mistakes and improve your game."
            buttonText="Challenge AI"
            disableBtn={true}
            handleClick={() => navigate('/chess-api')}
          />
        </Flex>
      </Flex>
    </Flex >
  )
}
