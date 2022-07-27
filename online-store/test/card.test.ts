import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
import { JSDOM } from 'jsdom';
import carList from '../src/data';
import Card from '../src/components/view/card';

describe('card to page tests', () => {
    beforeEach(async () => {
        const dom = await JSDOM.fromFile('src/index.html', { runScripts: 'dangerously', resources: 'usable' });
        document.body.innerHTML = dom.window.document.body.innerHTML;
    });
    it('add all cards to page', () => {
        carList.forEach((el) => {
            new Card().create(el);
        });
        expect(document.querySelectorAll('.card').length).toEqual(23);
    });

    it('add all cards to page', () => {
        new Card().create(carList[0]);
        const card = document.querySelector('.card') as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card.id).toEqual(carList[0].id);
        expect(document.querySelector('.price-value')).toBeInTheDocument();
        expect(document.querySelector('.card h3')).toBeInTheDocument();
    });
});
