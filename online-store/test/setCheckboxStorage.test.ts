import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import setCheckboxStorage from '../src/components/storage/checkboxStorage';

describe('setChekboxStorage function test', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
        document.body.innerHTML = dom.window.document.body.innerHTML;
    });
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
