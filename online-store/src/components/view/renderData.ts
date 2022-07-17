import createData from '../filter/createData';
import data from '../../data';
import Card from './card';
import Sort from '../filter/sort';
import { FinalObj } from '../../types/interface';

function renderData(object: FinalObj, event?: Event) {
    const select = document.querySelector('.select') as HTMLSelectElement;
    const selectOptions = select.value.split('-');
    const cartIds = JSON.parse(localStorage.getItem('cart') as string) as string[];

    if (selectOptions[0] === 'name') {
        Sort.sortByName(data, selectOptions[1]);
    } else {
        Sort.sortByPrice(data, selectOptions[1]);
    }

    let cardsOnPage = 0;
    const finalObj = createData(object, event);
    const cardsContainer = document.querySelector('.cards-container') as HTMLElement;
    cardsContainer.innerHTML = '';
    data.forEach((car) => {
        if (
            finalObj.body.includes(car.body) &&
            finalObj.brand.includes(car.brand) &&
            finalObj.fuelType.includes(car.fuelType) &&
            Number(finalObj.price[0]) <= Number(car.price) &&
            Number(finalObj.price[1]) >= Number(car.price) &&
            Number(finalObj.engineSize[0]) <= Number(car.engineSize) &&
            Number(finalObj.engineSize[1]) >= Number(car.engineSize) &&
            `${car.brand} ${car.model}`.toLowerCase().includes(finalObj.search[0]) &&
            (!finalObj.popular || finalObj.popular === car.popular)
        ) {
            const card = new Card();
            if (cartIds !== null) {
                card.create(car, cartIds.includes(car.id));
            } else {
                card.create(car);
            }
            cardsOnPage++;
        }
    });
    if (cardsOnPage === 0) {
        const emptyPage = document.createElement('div');
        emptyPage.innerHTML = 'No cars matching your search parameters';
        cardsContainer.append(emptyPage);
    }

    const cart = document.querySelector('.cart') as HTMLElement;
    if (cartIds !== null) {
        cart.innerHTML = cartIds.length.toString();
    }
}

export default renderData;
