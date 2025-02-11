import { MoveMetaData } from '../game-core/move-execution/buildMoveMetaData';
import standardMove from '../../assets/audio/standard-move.wav';
import checkmate from '../../assets/audio/end-game.mp3';
import capture from '../../assets/audio/capture.mp3';
import check from '../../assets/audio/check.mp3';
import notify from '../../assets/audio/notify.mp3';
import castle from '../../assets/audio/castle.mp3';

export function getMoveAudio(moveMetaData: MoveMetaData) {
  if (moveMetaData.isCheckmate) {
    return checkmate;
  } else if (moveMetaData.isCheck) {
    return check;
  } else if (moveMetaData.isPromotion) {
    return notify;
  } else if (moveMetaData.isCastle) {
    return castle;
  } else if (moveMetaData.isCapture) {
    return capture;
  } else {
    return standardMove;
  }
}
