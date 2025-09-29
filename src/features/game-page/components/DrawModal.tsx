import { Alert, Flex, IconButton } from "@chakra-ui/react";
import { BaseModal } from "base/components/BaseModal";
import { useDrawByAgreement } from "base/features/api-utils/hooks/useDrawByAgreement";
import { CircleX, Handshake } from "lucide-react";

interface DrawModalProps {
  gameId: string,
  close: () => void
}

export function DrawModal({ gameId, close }: DrawModalProps) {
  const drawMutation = useDrawByAgreement()

  const handleConfirmClick = () => {
    close()
    drawMutation.mutate({ gameId })
  }

  return (
    <BaseModal isOpen={true} onClose={close} allowClose={true}>
      <Flex p={6} flexDir='column' gap={6}>
        <Alert.Root justifyContent='center'>
          <Alert.Indicator />
          <Alert.Title>Your opponent is offering a draw</Alert.Title>
          <Alert.Indicator />
        </Alert.Root>
        <Flex gap={4} justifyContent='center'>
          <IconButton fontWeight='bold' p={6} color='black' bg='gray.400' onClick={handleConfirmClick}>
            <Handshake />
            Agree to Draw
          </IconButton>
          <IconButton fontWeight='bold' p={6} color='black' bg='red.400' onClick={close}>
            <CircleX />
            Reject Draw
          </IconButton>
        </Flex>
      </Flex>
    </BaseModal>
  )
}
