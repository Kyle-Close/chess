import { Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';

export function BaseModal() {
  return (
    <Modal isOpen={true} onClose={() => console.log('closed')}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text>Test</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
