import { Order, Sort } from '../types';
import { Settings } from './settings';

const settings = new Settings();

class Session {
  public garagePageNumber = settings.DEFAULT_INIT_VALUE;

  public winnersPageNumber = settings.DEFAULT_INIT_VALUE;

  public garageMaxPage: number = settings.DEFAULT_INIT_VALUE;

  public winnersMaxPage: number = settings.DEFAULT_INIT_VALUE;

  public currentGarage: number[] = [];

  public selectedCarId = 0;

  public sort: Sort = settings.DEFAULT_SORT;

  public order: Order = settings.DEFAULT_ORDER;
}

export default Session;
