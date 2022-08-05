import { Settings } from './settings';

const settings = new Settings();

class Session {
  public garagePageNumber = settings.DEFAULT_INIT_VALUE;

  public garageMaxPage: number = settings.DEFAULT_INIT_VALUE;

  public currentGarage: number[] = [];
}

export default Session;
