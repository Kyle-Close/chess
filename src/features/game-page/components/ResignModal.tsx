import { useResign } from "base/features/api-utils/hooks/useResign";
import { Color } from "base/zod/emums/Color";
import { Flag } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

interface ResignModalProps {
  gameId: string,
  resigningColor: Color,
  resigningName: string,
  close: () => void
}

export function ResignModal({ gameId, resigningColor, resigningName, close }: ResignModalProps) {
  const resignMutation = useResign()

  return (
    <ConfirmModal
      icon={Flag}
      tone='red'
      title='Resign this game?'
      description={`${resigningName} will forfeit and the game will end. This can't be undone.`}
      confirmLabel='Resign'
      onConfirm={() => resignMutation.mutate({ gameId, resigningColor })}
      close={close}
    />
  )
}
