import addToCart from './components/filter/addToCart';
import resetFilter from './components/filter/resetFilter';
import Storage from './components/storage/storage';
import createSliders from './components/view/createSliders';
import renderData from './components/view/renderData';
import './style.scss';
import { FinalObj } from './types/interface';
import * as noUiSlider from 'nouislider';

let startObject: FinalObj = {
    brand: [],
    body: [],
    fuelType: [],
    engineSize: [],
    price: [],
    search: [],
    popular: false,
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
        popular: false,
    };
    renderData(startObject);
} else {
    startObject = Storage.getStorage();
}

document.querySelectorAll('input[type=checkbox], .select').forEach((el) => {
    el.addEventListener('click', (event) => renderData(startObject, event));
});

const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
const price = document.querySelector('.price') as noUiSlider.target;
(engineSize.noUiSlider as noUiSlider.API).on('set', () => renderData(startObject));
(price.noUiSlider as noUiSlider.API).on('set', () => renderData(startObject));

const search = document.querySelector('.search') as HTMLInputElement;
search.addEventListener('input', () => renderData(startObject));

window.addEventListener('load', () => {
    renderData(startObject);
});

(document.querySelector('.cards-container') as HTMLElement).addEventListener('click', (e) => addToCart(e));

(document.querySelector('.settings-reset-btn') as HTMLElement).addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

(document.querySelector('.filter-reset-btn') as HTMLElement).addEventListener('click', () => {
    resetFilter();
});

const closeSearch = document.querySelector('.close-search') as HTMLElement;
closeSearch.addEventListener('click', () => {
    search.value = '';
    renderData(startObject);
    closeSearch.classList.toggle('active');
});
