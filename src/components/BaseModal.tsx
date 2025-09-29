import { DialogContent, DialogRoot } from "./ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  allowClose?: boolean
}

export function BaseModal({ isOpen, onClose, children, allowClose }: BaseModalProps) {
  return (
    <DialogRoot onInteractOutside={(e) => { if (!allowClose) e.preventDefault() }} onEscapeKeyDown={(e) => e.preventDefault()} open={isOpen} onOpenChange={onClose}>
      <DialogContent top='35%' borderRadius='1rem' className='mx-4'>
        {children}
      </DialogContent>
    </DialogRoot>
  );
}
