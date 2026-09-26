import { DialogContent, DialogRoot } from "./ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  allowClose?: boolean
}

export function BaseModal({ isOpen, onClose, children, allowClose }: BaseModalProps) {
  return (
    <DialogRoot
      placement='center'
      motionPreset='slide-in-bottom'
      onInteractOutside={(e) => { if (!allowClose) e.preventDefault() }}
      onEscapeKeyDown={(e) => { if (!allowClose) e.preventDefault() }}
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        bg='ink.850'
        border='1px solid'
        borderColor='border.emphasized'
        borderRadius='2xl'
        mx={4}
        maxW='sm'
        overflow='hidden'
        boxShadow='0 40px 90px -20px rgba(0, 0, 0, 0.85)'
      >
        {children}
      </DialogContent>
    </DialogRoot>
  );
}
