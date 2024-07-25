import { TimeControl } from '../../../redux/slices/gameSettings';

export function getStartingTimeInSeconds(timeControl: TimeControl) {
  switch (timeControl) {
    case TimeControl.FREE_PLAY:
      return 0;
    case TimeControl.BLITZ:
      return 180;
    case TimeControl.RAPID:
      return 600;
    case TimeControl.CLASSICAL:
      return 1800;
    default:
      throw Error(`Time control '${timeControl} does not have time in seconds set up.'`);
  }
}
