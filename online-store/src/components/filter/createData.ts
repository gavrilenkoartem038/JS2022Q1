import Filter from './filter';
import { FinalObj } from '../../types/interface';
import * as noUiSlider from 'nouislider';

const finalObj: FinalObj = {
    brand: ['BMW', 'Volkswagen', 'Renault', 'Toyota', 'Hyundai'],
    body: ['sedan', 'hatchback', 'SUV'],
    fuelType: ['petrol', 'diesel'],
    engineSize: ['1.4', '4.0'],
    price: ['12.99', '75.99'],
    search: [''],
};

function createData() {
    const a = document.querySelectorAll('input[type=checkbox]');
    a.forEach((el) => {
        el.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (e.target) {
                const name = target.name;
                finalObj[name as keyof typeof finalObj] = Filter.filter(e.target as HTMLInputElement);
            }
        });
    });

    const search = document.querySelector('.search') as HTMLInputElement;
    search.addEventListener('input', () => (finalObj.search[0] = search.value));

    const price = document.querySelector('.price') as noUiSlider.target;
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    price.addEventListener('click', () => (finalObj.price = (price.noUiSlider as noUiSlider.API).get() as string[]));
    engineSize.addEventListener(
        'click',
        () => (finalObj.engineSize = (engineSize.noUiSlider as noUiSlider.API).get() as string[])
    );
    return finalObj;
}

export default createData;
