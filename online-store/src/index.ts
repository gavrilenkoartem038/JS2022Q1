import createSliders from './components/view/createSliders';
import renderData from './components/view/renderData';
import './style.scss';
import { FinalObj } from './types/interface';

const startObject: FinalObj = {
    brand: ['BMW', 'Volkswagen', 'Renault', 'Toyota', 'Hyundai'],
    body: ['sedan', 'hatchback', 'SUV'],
    fuelType: ['petrol', 'diesel'],
    engineSize: ['1.4', '4.0'],
    price: ['12.99', '75.99'],
    search: [''],
};

createSliders();
renderData(startObject);
document.addEventListener('click', () => renderData(startObject));
(document.querySelector('.search') as HTMLInputElement).addEventListener('input', () => renderData(startObject));
