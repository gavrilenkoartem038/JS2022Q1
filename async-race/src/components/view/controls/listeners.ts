import Controls from './constrols';

const controls = new Controls();

class Listeners {
  public init = () => {
    window.addEventListener('load', controls.initPage);
  };
}

export default Listeners;
