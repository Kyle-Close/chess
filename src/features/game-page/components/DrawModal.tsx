import { useDrawByAgreement } from "base/features/api-utils/hooks/useDrawByAgreement";
import { Handshake } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

interface DrawModalProps {
  gameId: string,
  /** Player offering the draw, and the one who has to accept it (null against the engine) */
  offeredBy: string,
  offeredTo: string | null,
  close: () => void
}

export function DrawModal({ gameId, offeredBy, offeredTo, close }: DrawModalProps) {
  const drawMutation = useDrawByAgreement()

  return offeredTo ? (
    <ConfirmModal
      icon={Handshake}
      title='Draw offered'
      description={<><b>{offeredBy}</b> is offering a draw. <b>{offeredTo}</b>, do you accept?</>}
      confirmLabel='Accept draw'
      cancelLabel='Decline'
      onConfirm={() => drawMutation.mutate({ gameId })}
      close={close}
    />
  ) : (
    <ConfirmModal
      icon={Handshake}
      title='Agree to a draw?'
      description='The game will end immediately with a shared point.'
      confirmLabel='Agree to draw'
      onConfirm={() => drawMutation.mutate({ gameId })}
      close={close}
    />
  )
}
