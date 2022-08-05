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
  };
}

export default Listeners;
