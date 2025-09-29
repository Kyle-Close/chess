import { Alert, Flex, IconButton } from "@chakra-ui/react";
import { BaseModal } from "base/components/BaseModal";
import { useResign } from "base/features/api-utils/hooks/useResign";
import { Color } from "base/zod/emums/Color";
import { Check, CircleX } from "lucide-react";

interface ResignModalProps {
  gameId: string,
  resigningColor: Color,
  close: () => void
}

export function ResignModal({ gameId, resigningColor, close }: ResignModalProps) {
  const resignMutation = useResign()

  const handleConfirmClick = () => {
    close()
    resignMutation.mutate({ gameId, resigningColor })
  }

  return (
    <BaseModal isOpen={true} onClose={close} allowClose={true}>
      <Flex p={6} flexDir='column' gap={6}>
        <Alert.Root justifyContent='center' status='error'>
          <Alert.Indicator />
          <Alert.Title>You are about to resign. Please confirm</Alert.Title>
        </Alert.Root>
        <Flex gap={4} justifyContent='center'>
          <IconButton fontWeight='bold' p={6} color='black' bg='gray.400' onClick={handleConfirmClick}>
            <Check />
            Confirm Resignation
          </IconButton>
          <IconButton fontWeight='bold' p={6} color='black' bg='red.400' onClick={close}>
            <CircleX />
            Close
          </IconButton>
        </Flex>
      </Flex>
    </BaseModal>
  )
}
