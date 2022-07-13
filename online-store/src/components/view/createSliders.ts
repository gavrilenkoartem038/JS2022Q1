import Slider from '../view/slider';
import * as noUiSlider from 'nouislider';

function createSliders(): void {
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    const engineSizeSlider = new Slider(engineSize, 1.0, 5.0, 0.1);
    engineSizeSlider.drawSlider();

    const price = document.querySelector('.price') as noUiSlider.target;
    const priceSlider = new Slider(price, 11.99, 75.99, 0.1);
    priceSlider.drawSlider();
}

export default createSliders;
