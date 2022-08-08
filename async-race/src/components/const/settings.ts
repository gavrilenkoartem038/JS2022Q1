import { Order, Sort } from '../types';

export class Settings {
  public SERVER = 'http://127.0.0.1:3000/';

  public GARAGE_ITEMS_PER_PAGE = 7;

  public WINNERS_ITEMS_PER_PAGE = 10;

  public DEFAULT_INIT_VALUE = 1;

  public DEFAULT_ITEMS_PER_GENERATION = 100;

  public MAX_RGB_VALUE = 256;

  public ANIMATION_COEFFICIENT = 1000;

  public RACE_TIME_ORDER = 2;

  public DEFAULT_SORT: Sort = Sort.ID;

  public DEFAULT_ORDER: Order = Order.ASC;
}
