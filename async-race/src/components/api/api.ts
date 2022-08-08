/* eslint-disable @typescript-eslint/comma-dangle */
import { getRandomColor, getRandomNum } from '../utils';
import { Settings } from '../const/settings';
import brandsCars from '../data/brands';
import modelsCars from '../data/models';
import { Templatate } from './template';
import {
  Car,
  Drive,
  Engine,
  EngineStatus,
  Garage,
  GarageData,
  Headers,
  Method,
  Order,
  Sort,
  Status,
  Winner,
  WinnersData,
} from '../types';

const settings = new Settings();
const temp = new Templatate();

class API {
  public base = settings.SERVER;

  public garage = `${this.base}garage`;

  public engine = `${this.base}engine`;

  public winners = `${this.base}winners`;

  public getAllCars = async (page: number, limit = settings.GARAGE_ITEMS_PER_PAGE): Promise<GarageData> => {
    const res = await fetch(`${this.garage}?${temp.page(limit, page)}`);
    return {
      garage: await res.json(),
      total: parseInt(<string>res.headers.get(Headers.TOTAL_COUNT), 10),
    };
  };

  public getCar = async (id: number): Promise<Car> => {
    return (await fetch(`${this.garage}/${id}`)).json();
  };

  public deleteCar = async (id: number): Promise<void> => {
    await fetch(`${this.garage}/${id}`, { method: Method.DELETE });
    if ((await fetch(`${this.winners}/${id}`)).status !== Status.NOT_FOUND) {
      await fetch(`${this.winners}/${id}`, { method: Method.DELETE });
    }
  };

  public createCar = async (body: Car): Promise<Car> => {
    return (
      await fetch(`${this.garage}`, {
        method: Method.POST,
        headers: { [Headers.CONTENT_TYPE]: 'application/json' },
        body: JSON.stringify(body),
      })
    ).json();
  };

  public updateCar = async (id: number, body: Car): Promise<Car> => {
    return (
      await fetch(`${this.garage}/${id}`, {
        method: Method.PUT,
        headers: { [Headers.CONTENT_TYPE]: 'application/json' },
        body: JSON.stringify(body),
      })
    ).json();
  };

  public generateCars = async (n: number = settings.DEFAULT_INIT_VALUE): Promise<Garage> => {
    const result: Garage = await Promise.all(
      new Array(n).fill(undefined).map(async () => {
        const car: Car = await this.createCar({
          name: `${brandsCars[getRandomNum(brandsCars.length)]} ${modelsCars[getRandomNum(modelsCars.length)]}`,
          color: `#${getRandomColor(settings.MAX_RGB_VALUE)}`,
        });
        return car;
        // eslint-disable-next-line @typescript-eslint/comma-dangle
      })
    );
    return result;
  };

  public startEngine = async (id: number): Promise<Engine> => {
    return (
      await fetch(`${this.engine}?${temp.id(id)}&${temp.status(EngineStatus.START)}`, { method: Method.PATCH })
    ).json();
  };

  public stopEngine = async (id: number): Promise<Engine> => {
    return (
      await fetch(`${this.engine}?${temp.id(id)}&${temp.status(EngineStatus.STOP)}`, { method: Method.PATCH })
    ).json();
  };

  public drive = async (id: number): Promise<Drive> => {
    const res = await fetch(`${this.engine}?${temp.id(id)}&${temp.status(EngineStatus.DRIVE)}`, {
      method: Method.PATCH,
    }).catch();
    if (res.status === Status.OK) {
      return { ...(await res.json()) };
    }
    return { success: false };
  };

  public getWinner = async (id: number): Promise<Winner> => {
    return (await fetch(`${this.winners}/${id}`)).json();
  };

  public createWinner = async (body: Winner): Promise<Winner> => {
    return (
      await fetch(`${this.winners}`, {
        method: Method.POST,
        headers: { [Headers.CONTENT_TYPE]: 'application/json' },
        body: JSON.stringify(body),
      })
    ).json();
  };

  public updateWinner = async (body: Winner): Promise<Winner> => {
    return (
      await fetch(`${this.winners}/${body.id}`, {
        method: Method.PUT,
        headers: { [Headers.CONTENT_TYPE]: 'application/json' },
        body: JSON.stringify(body),
      })
    ).json();
  };

  public saveWinner = async (id: number, time: number): Promise<void> => {
    if ((await fetch(`${this.winners}/${id}`)).status === Status.OK) {
      const winner = await this.getWinner(id);
      console.log(winner, 'ddddddd');
      await this.updateWinner({
        id,
        wins: (winner.wins += 1),
        time: time < winner.time ? time : winner.time,
      });
    } else {
      await this.createWinner({
        id,
        wins: 1,
        time: time,
      });
    }
  };

  public getAllWinners = async (
    page: number,
    limit = settings.WINNERS_ITEMS_PER_PAGE,
    sort: Sort = settings.DEFAULT_SORT,
    order: Order = settings.DEFAULT_ORDER
  ): Promise<WinnersData> => {
    const res = await fetch(`${this.winners}?${temp.page(limit, page)}&${temp.sort(sort)}&${temp.order(order)}`);
    return {
      winners: await res.json(),
      total: parseInt(<string>res.headers.get(Headers.TOTAL_COUNT), 10),
    };
  };
}

export default API;
