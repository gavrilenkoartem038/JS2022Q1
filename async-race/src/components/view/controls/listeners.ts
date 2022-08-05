import { callbackBuilder } from '../../utils';
import Controls from './constrols';

const controls = new Controls();

class Listeners {
  public init = () => {
    window.addEventListener('load', controls.initPage);
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.createCar, 'create-car', e));
    document.addEventListener('click', (e: Event) => callbackBuilder(controls.deleteCar, 'delete', e));
  };
}

export default Listeners;
