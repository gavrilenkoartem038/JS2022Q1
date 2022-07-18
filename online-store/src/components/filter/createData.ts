import Filter from './filter';
import { FinalObj } from '../../types/interface';
import * as noUiSlider from 'nouislider';
import Storage from '../storage/storage';

function createData(object: FinalObj, event?: Event): FinalObj {
    const checkboxElements = document.querySelectorAll('input[type=checkbox]');
    const target = event?.target as HTMLInputElement;
    if (Array.from(checkboxElements).includes(target)) {
        (object[target.name as keyof typeof object] as string[]) = Filter.filter(target);
    }

    const search = document.querySelector('.search') as HTMLInputElement;
    object.search[0] = search.value;

    const popular = document.querySelector('#popular') as HTMLInputElement;
    object.popular = popular.checked ? true : false;

    const price = document.querySelector('.price') as noUiSlider.target;
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    object.price = (price.noUiSlider as noUiSlider.API).get() as string[];
    object.engineSize = (engineSize.noUiSlider as noUiSlider.API).get() as string[];
    Storage.setStorage();
    return object;
}

export default createData;
