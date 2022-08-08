import { callbackBuilder } from '../../utils';
import Controls from './constrols';

const controls = new Controls();

class Listeners {
  public init = () => {
    window.addEventListener('load', controls.initPage);
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.createCar, 'create-car', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.deleteCar, 'delete', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.generateCars, 'generate-cars', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.nextGarage, 'next-garage', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.prevGarage, 'prev-garage', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.selectCar, 'select', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.updateCar, 'update-car', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.driveCar, 'start', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.stopCar, 'stop', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.startRace, 'start-race', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.resetRace, 'reset-race', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.nextWinners, 'next-winners', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.prevWinners, 'prev-winners', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.showWinners, 'winners-btn', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.showGarage, 'garage-btn', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.sortWinners, 'sort', e));
  };
}

export default Listeners;
