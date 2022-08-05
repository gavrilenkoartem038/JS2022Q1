import API from '../../api/api';
import Session from '../../const/session';
import { Settings } from '../../const/settings';
import { Callback, Car, EventCallback } from '../../types';
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
    const response = await api.getAllCars(settings.DEFAULT_INIT_VALUE);
    if (response) {
      const { garage: items, total } = response;
      session.currentGarage = items.map((car: Car): number => <number>car.id);
      session.garageMaxPage = Math.ceil(total / settings.GARAGE_ITEMS_PER_PAGE) || settings.DEFAULT_INIT_VALUE;
      currentPage.innerHTML = `${session.garagePageNumber}`;
      totalPages.innerHTML = `${session.garageMaxPage}`;
      itemCounter.innerHTML = `${total}`;
      container.innerHTML = '';
      items.forEach((car: Car): void => {
        container.innerHTML += parts.road(<number>car.id, car.name, car.color);
      });
    }
  };

  public initPage: Callback = async (): Promise<void> => {
    document.body.innerHTML += initialHtml.template();
    this.loadGarage();
  };

  public createCar: Callback = async (): Promise<void> => {
    const name: string = (document.querySelector('.create-name') as HTMLInputElement).value;
    const color: string = (document.querySelector('.create-color') as HTMLInputElement).value;
    await api.createCar({ name, color });
    this.loadGarage();
  };

  public deleteCar: EventCallback = async (e: Event): Promise<void> => {
    const id: number = parseInt(<string>(e.target as HTMLElement).dataset.id, 10);
    console.log(id);
    await api.deleteCar(id);
    this.loadGarage();
  };
}
export default Controls;
