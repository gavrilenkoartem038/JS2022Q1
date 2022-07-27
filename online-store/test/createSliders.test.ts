import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import createSliders from '../src/components/view/createSliders';
import * as noUiSlider from 'nouislider';

describe('slider test', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
        document.body.innerHTML = dom.window.document.body.innerHTML;
        createSliders();
    });
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
