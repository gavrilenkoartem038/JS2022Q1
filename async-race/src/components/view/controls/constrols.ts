/* eslint-disable @typescript-eslint/comma-dangle */
import API from '../../api/api';
import Session from '../../const/session';
import { Settings } from '../../const/settings';
import { Callback, Car, Engine, EventCallback, RaceCar, Winner } from '../../types';
import Initial from '../html/initial';
import HTMLParts from '../html/parts';

const initialHtml = new Initial();
const parts = new HTMLParts();
const api = new API();
const settings = new Settings();
const session = new Session();

class Controls {
  public loadGarage: Callback = async (): Promise<void> => {
    const container = document.querySelector('.roads') as HTMLElement;
    const itemCounter = document.querySelector('.cars-count') as HTMLElement;
    const currentPage = document.querySelector('.garage-cur') as HTMLElement;
    const totalPages = document.querySelector('.garage-tot') as HTMLElement;
    const prevPage = document.querySelector('.prev-garage') as HTMLButtonElement;
    const nextPage = document.querySelector('.next-garage') as HTMLButtonElement;
    const response = await api.getAllCars(session.garagePageNumber);
    if (response) {
      const { garage: items, total } = response;
      session.currentGarage = items.map((car: Car): number => <number>car.id);
      session.garageMaxPage = Math.ceil(total / settings.GARAGE_ITEMS_PER_PAGE) || settings.DEFAULT_INIT_VALUE;
      prevPage.disabled = session.garagePageNumber < 2;
      nextPage.disabled = session.garagePageNumber >= session.garageMaxPage;
      currentPage.innerHTML = `${session.garagePageNumber}`;
      totalPages.innerHTML = `${session.garageMaxPage}`;
      itemCounter.innerHTML = `${total}`;
      container.innerHTML = '';
      items.forEach((car: Car): void => {
        container.innerHTML += parts.road(<number>car.id, car.name, car.color);
      });
    }
  };

  public loadWinners: Callback = async (): Promise<void> => {
    const container = document.querySelector('.winners') as HTMLElement;
    const itemCounter = document.querySelector('.winners-count') as HTMLElement;
    const currentPage = document.querySelector('.winners-cur') as HTMLElement;
    const totalPages = document.querySelector('.winners-tot') as HTMLElement;
    const prevPage = document.querySelector('.prev-winners') as HTMLButtonElement;
    const nextPage = document.querySelector('.next-winners') as HTMLButtonElement;
    const response = await api.getAllWinners(session.winnersPageNumber);
    if (response) {
      const { winners: items, total } = response;
      session.winnersMaxPage = Math.ceil(total / settings.WINNERS_ITEMS_PER_PAGE) || settings.DEFAULT_INIT_VALUE;
      prevPage.disabled = session.winnersPageNumber < 2;
      nextPage.disabled = session.winnersPageNumber >= session.winnersMaxPage;
      currentPage.innerHTML = `${session.winnersPageNumber}`;
      totalPages.innerHTML = `${session.winnersMaxPage}`;
      itemCounter.innerHTML = `${total}`;
      container.innerHTML = '';
      items.forEach((car: Winner): void => {
        container.innerHTML += car.wins;
      });
    }
  };

  public initPage: Callback = async (): Promise<void> => {
    document.body.innerHTML += initialHtml.template();
    this.loadGarage();
    this.loadWinners();
  };

  public createCar: Callback = async (): Promise<void> => {
    const name: string = (document.querySelector('.create-name') as HTMLInputElement).value;
    const color: string = (document.querySelector('.create-color') as HTMLInputElement).value;
    await api.createCar({ name, color });
    this.loadGarage();
  };

  public generateCars: Callback = async (): Promise<void> => {
    await api.generateCars(settings.DEFAULT_ITEMS_PER_GENERATION);
    this.loadGarage();
  };

  public nextGarage: Callback = async (): Promise<void> => {
    session.garagePageNumber += 1;
    this.loadGarage();
  };

  public prevGarage: Callback = async (): Promise<void> => {
    session.garagePageNumber -= 1;
    this.loadGarage();
  };

  public deleteCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(e.target as HTMLElement).dataset.id, 10);
    await api.deleteCar(id);
    this.loadGarage();
  };

  public selectCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(e.target as HTMLElement).dataset.id, 10);
    const response = await api.getCar(id);
    (document.querySelector('.update-name') as HTMLInputElement).value = response.name;
    (document.querySelector('.update-color') as HTMLInputElement).value = response.color;
    (document.querySelector('.update-car') as HTMLButtonElement).disabled = false;
    session.selectedCarId = id;
  };

  public updateCar: Callback = async (): Promise<void> => {
    const id: number = session.selectedCarId;
    const name: string = (document.querySelector('.update-name') as HTMLInputElement).value;
    const color: string = (document.querySelector('.update-color') as HTMLInputElement).value;
    await api.updateCar(id, { name, color });
    session.selectedCarId = 0;
    (document.querySelector('.update-car') as HTMLButtonElement).disabled = true;
    this.loadGarage();
  };

  public driveCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(e.target as HTMLElement).dataset.id, 10);
    const car = document.querySelector(`.road[data-id='${id}'] .car`) as HTMLElement;
    const { velocity, distance } = await api.startEngine(id);
    const time = (distance / velocity / settings.ANIMATION_COEFFICIENT).toFixed(settings.RACE_TIME_ORDER);
    (<HTMLButtonElement>e.target).disabled = true;
    (<HTMLButtonElement>document.querySelector(`.stop[data-id='${id}']`)).disabled = false;
    car.style.animationDuration = `${time}s`;
    car.classList.add('drive');
    const { success } = await api.drive(id);
    if (!success) {
      car.classList.add('crash');
    }
  };

  public stopCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(e.target as HTMLElement).dataset.id, 10);
    const car = document.querySelector(`.road[data-id='${id}'] .car`) as HTMLElement;
    car.classList.remove('drive', 'crash');
    (<HTMLButtonElement>e.target).disabled = true;
    (<HTMLButtonElement>document.querySelector(`.start[data-id='${id}']`)).disabled = false;
    await api.stopEngine(id);
  };

  public getCarRaceInfo = async (id: number): Promise<RaceCar> => {
    const { velocity, distance } = await api.startEngine(id);
    return {
      id,
      time: parseFloat((distance / velocity / settings.ANIMATION_COEFFICIENT).toFixed(settings.RACE_TIME_ORDER)),
    };
  };

  public getWinner = async (raceCar: RaceCar): Promise<RaceCar> => {
    const { id, time } = raceCar;
    const car = document.querySelector(`.road[data-id='${id}'] .car`) as HTMLElement;
    (<HTMLButtonElement>document.querySelector(`.stop[data-id='${id}']`)).disabled = false;
    (<HTMLButtonElement>document.querySelector(`.start[data-id='${id}']`)).disabled = true;
    car.style.animationDuration = `${time}s`;
    car.classList.add('drive');
    const { success } = await api.drive(id);
    if (!success) {
      car.classList.add('crash');
      throw new Error('car crached');
    }
    return { id, time };
  };

  public startRace: Callback = async (): Promise<void> => {
    await this.resetRace();
    const garage = session.currentGarage;
    const cars: RaceCar[] = await Promise.all(garage.map(this.getCarRaceInfo));
    const winner: RaceCar | void = await Promise.any(cars.map(this.getWinner)).catch(() => {
      console.log('all cars crashed');
    });
    if (typeof winner === 'object') {
      await api.saveWinner(winner.id, winner.time);
      const { name } = await api.getCar(winner.id);
      const message = <HTMLElement>document.querySelector('.message');
      message.innerHTML = `Last winner ${name} (${winner.time}s)`;
      message.style.visibility = 'visible';
      setTimeout(() => (message.style.visibility = 'hidden'), 3000);
      this.loadWinners();
    }
  };

  public resetRace: Callback = async (): Promise<void> => {
    const garage = session.currentGarage;
    await Promise.all(
      garage.map(
        async (id: number): Promise<Engine> => {
          const resp = await api.stopEngine(id);
          return resp;
        }
      )
    );
    document.querySelectorAll('.race-container').forEach((value: Element): void => {
      (<HTMLButtonElement>value.querySelector('.start')).disabled = false;
      (<HTMLButtonElement>value.querySelector('.stop')).disabled = true;
      value.querySelector('.car')?.classList.remove('drive', 'crash');
    });
  };

  public nextWinners: Callback = async (): Promise<void> => {
    session.winnersPageNumber += 1;
    this.loadWinners();
  };

  public prevWinners: Callback = async (): Promise<void> => {
    session.winnersPageNumber -= 1;
    this.loadWinners();
  };

  public showWinners: Callback = async (): Promise<void> => {
    (<HTMLElement>document.querySelector('.winners-page')).style.visibility = 'visible';
    (<HTMLElement>document.querySelector('.header')).style.visibility = 'hidden';
    (<HTMLElement>document.querySelector('.main')).style.visibility = 'hidden';
  };

  public showGarage: Callback = async (): Promise<void> => {
    (<HTMLElement>document.querySelector('.winners-page')).style.visibility = 'hidden';
    (<HTMLElement>document.querySelector('.header')).style.visibility = 'visible';
    (<HTMLElement>document.querySelector('.main')).style.visibility = 'visible';
  };
}
export default Controls;
