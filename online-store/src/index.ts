import Storage from './components/storage/storage';
import createSliders from './components/view/createSliders';
import renderData from './components/view/renderData';
import './style.scss';
import { FinalObj } from './types/interface';

let startObject: FinalObj = {
    brand: [],
    body: [],
    fuelType: [],
    engineSize: [],
    price: [],
    search: [],
};

createSliders();

if (localStorage.getItem('storageObject') === null) {
    startObject = {
        brand: ['BMW', 'Volkswagen', 'Renault', 'Toyota', 'Hyundai'],
        body: ['sedan', 'hatchback', 'SUV'],
        fuelType: ['petrol', 'diesel'],
        engineSize: ['1.4', '4.0'],
        price: ['12.99', '75.99'],
        search: [''],
    };
    renderData(startObject);
} else {
    startObject = Storage.getStorage();
}

document.querySelectorAll('input[type=checkbox], .slider, .select').forEach((el) => {
    el.addEventListener('click', (event) => renderData(startObject, event));
});
(document.querySelector('.search') as HTMLInputElement).addEventListener('input', () => renderData(startObject));

window.addEventListener('load', () => {
    renderData(startObject);
});
