import { DialogContent, DialogRoot } from "./ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent borderRadius='1rem' className='mx-4'>
        {children}
      </DialogContent>
    </DialogRoot>
  );
}
