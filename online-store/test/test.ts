import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import carList from '../src/data';
import Card from '../src/components/view/card';
import Sort from '../src/components/filter/sort';
import createSliders from '../src/components/view/createSliders';
import * as noUiSlider from 'nouislider';
import setCheckboxStorage from '../src/components/storage/checkboxStorage';

beforeEach(async () => {
    const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
    document.body.innerHTML = dom.window.document.body.innerHTML;
});

describe('sort tests', () => {
    it('sortByName a-z', () => {
        Sort.sortByName(carList, 'min');
        expect(carList[0].model).toEqual('3');
        expect(carList[5].id).toEqual('19');
        expect(carList[22].id).toEqual('7');
    });

    it('sortByName z-a', () => {
        Sort.sortByName(carList, 'max');
        expect(carList[0].model).toEqual('Polo');
        expect(carList[6].id).toEqual('15');
        expect(carList[17].model).toEqual('Accent');
    });

    it('sortByPrice lowest', () => {
        Sort.sortByPrice(carList, 'min');
        expect(carList[0].price).toEqual('14.390');
        expect(carList[10].price).toEqual('29.890');
        expect(carList[22].price).toEqual('73.490');
    });

    it('sortByPrice highest', () => {
        Sort.sortByPrice(carList, 'max');
        expect(carList[0].price).toEqual('73.490');
        expect(carList[15].price).toEqual('25.890');
        expect(carList[22].price).toEqual('14.390');
    });
});

describe('slider test', () => {
    beforeEach(() => createSliders());
    it('create slider', () => {
        expect(document.querySelector('.price.noUi-target')).toBeInTheDocument();
        expect(document.querySelector('.engineSize.noUi-target')).toBeInTheDocument();
        expect(document.querySelectorAll('.noUi-target').length).toEqual(2);
    });

    it('check sliders max and min values', () => {
        const price = document.querySelector('.price') as noUiSlider.target;
        const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
        expect((price.noUiSlider as noUiSlider.API).get()).toEqual(['14.39', '73.49']);
        expect((engineSize.noUiSlider as noUiSlider.API).get()).toEqual(['1.40', '4.00']);
    });
});

describe('setChekboxStorage function test', () => {
    it('if no elements checked', () => {
        expect(setCheckboxStorage('brand').length).toEqual(5);
        expect(setCheckboxStorage('body').length).toEqual(3);
        expect(setCheckboxStorage('fuelType').length).toEqual(2);
    });

    it('if click some elements', () => {
        (document.querySelector('#petrol') as HTMLInputElement).click();
        (document.querySelector('#BMW') as HTMLInputElement).click();
        (document.querySelector('#Toyota') as HTMLInputElement).click();
        expect(setCheckboxStorage('fuelType')).toEqual(['petrol']);
        expect(setCheckboxStorage('brand')).toEqual(['BMW', 'Toyota']);
    });
});

describe('card to page tests', () => {
    it('add all cards to page', () => {
        carList.forEach((el) => {
            new Card().create(el);
        });
        expect(document.querySelectorAll('.card').length).toEqual(23);
    });

    it('add all cards to page', () => {
        new Card().create(carList[0]);
        const card = document.querySelector('.card');
        expect(card).toBeInTheDocument();
        expect(card?.id).toEqual(carList[0].id);
        expect(document.querySelector('.price-value')).toBeInTheDocument();
        expect(document.querySelector('.card h3')).toBeInTheDocument();
    });
});
