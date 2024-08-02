import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className='mx-4'>
        <ModalBody p={0} className='rounded-lg'>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
