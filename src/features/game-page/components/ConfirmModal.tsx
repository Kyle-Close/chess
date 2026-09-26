import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { BaseModal } from "base/components/BaseModal";
import { LucideIcon } from "lucide-react";

interface ConfirmModalProps {
  icon: LucideIcon,
  title: string,
  description: React.ReactNode,
  confirmLabel: string,
  cancelLabel?: string,
  tone?: 'gold' | 'red',
  onConfirm: () => void,
  close: () => void
}

export function ConfirmModal({ icon: ModalIcon, title, description, confirmLabel, cancelLabel = 'Cancel', tone = 'gold', onConfirm, close }: ConfirmModalProps) {
  const accent = tone === 'red' ? '#e5736b' : '#e4b75e';

  return (
    <BaseModal isOpen={true} onClose={close} allowClose={true}>
      <Box p={7}>
        <Flex w={11} h={11} align='center' justify='center' borderRadius='xl' mb={5} style={{ color: accent, background: `${accent}1f` }}>
          <ModalIcon size={22} />
        </Flex>
        <Heading as='h2' fontFamily='heading' fontSize='2xl' fontWeight='600'>{title}</Heading>
        <Text mt={2} color='fg.muted'>{description}</Text>
        <Flex mt={7} gap={3}>
          <Button flex={1} variant='outline' borderColor='border.emphasized' onClick={close}>{cancelLabel}</Button>
          <Button flex={1} fontWeight='semibold' colorPalette={tone} onClick={() => { close(); onConfirm(); }}>{confirmLabel}</Button>
        </Flex>
      </Box>
    </BaseModal>
  )
}
