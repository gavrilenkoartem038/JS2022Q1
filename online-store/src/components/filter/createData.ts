import Filter from './filter';
import { FinalObj } from '../../types/interface';
import * as noUiSlider from 'nouislider';

function createData(object: FinalObj) {
    const checkboxElements = document.querySelectorAll('input[type=checkbox]');
    checkboxElements.forEach((el) => {
        el.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (e.target) {
                const name = target.name;
                object[name as keyof typeof object] = Filter.filter(e.target as HTMLInputElement);
            }
        });
    });

    const search = document.querySelector('.search') as HTMLInputElement;
    search.addEventListener('input', () => (object.search[0] = search.value));

    const price = document.querySelector('.price') as noUiSlider.target;
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    price.addEventListener('click', () => (object.price = (price.noUiSlider as noUiSlider.API).get() as string[]));
    engineSize.addEventListener(
        'click',
        () => (object.engineSize = (engineSize.noUiSlider as noUiSlider.API).get() as string[])
    );
    return object;
}

export default createData;
