import { TimeControl } from "base/redux/slices/gameSettings";

export function getSecondsToIncrement(timeControl: TimeControl) {
  switch (timeControl) {
    case TimeControl.BLITZ:
      return 2;
    case TimeControl.RAPID:
      return 10;
    case TimeControl.CLASSICAL:
      return 15;
    default:
      return 0;
  }
}
