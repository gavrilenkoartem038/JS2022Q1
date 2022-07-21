import Slider from '../view/slider';
import * as noUiSlider from 'nouislider';

function createSliders(): void {
    const engineSizeMin = 1.4;
    const engineSizeMax = 4.0;
    const engineSizeStep = 0.1;
    const priceMin = 14.39;
    const priceMax = 73.49;
    const priceStep = 0.1;

    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    const engineSizeSlider = new Slider(engineSize, engineSizeMin, engineSizeMax, engineSizeStep);
    engineSizeSlider.drawSlider();

    const price = document.querySelector('.price') as noUiSlider.target;
    const priceSlider = new Slider(price, priceMin, priceMax, priceStep);
    priceSlider.drawSlider();
}

export default createSliders;
