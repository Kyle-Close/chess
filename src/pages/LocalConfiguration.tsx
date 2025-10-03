import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Colors } from "base/features/game-configuration/components/Colors";
import { Custom } from "base/features/game-configuration/components/Custom";
import { Players } from "base/features/game-configuration/components/Players";
import { TimeControl } from "base/features/game-configuration/components/TimeControl";
import { useLocalConfiguration } from "base/features/game-configuration/hooks/useLocalConfiguration";
import { Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LocalConfiguration() {
  const navigate = useNavigate();
  const { localConfigurationFormInputs, getRandomName, onSubmit } = useLocalConfiguration()

  return (
    <Flex flexDir='column' m={6}>
      <Flex flexDir='column' as='form' onSubmit={localConfigurationFormInputs.handleSubmit(onSubmit)}>
        <Flex alignItems='end' justifyContent='space-between'>
          <Text>Configure Your Game Settings</Text>
          <Flex mt={2} gap={6} >
            <IconButton onClick={() => navigate("/")} border='1px solid rgba(255, 255, 255, 0.3)' p={4} >
              <X />
              Cancel
            </IconButton>
            <IconButton type="submit" p={4} bgColor='gray.100' color='black'>
              <Play />
              Start Game
            </IconButton>
          </Flex>
        </Flex>
        <Players localConfigurationForm={localConfigurationFormInputs} getRandomName={getRandomName} />
        <Colors localConfigurationForm={localConfigurationFormInputs} />
        <TimeControl localConfigurationForm={localConfigurationFormInputs} />
        <Custom localConfigurationForm={localConfigurationFormInputs} />
      </Flex>
    </Flex>
  )
}
