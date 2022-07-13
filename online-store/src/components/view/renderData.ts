import createData from '../filter/createData';
import data from '../../data';
import Card from './card';
import Sort from '../filter/sort';

function renderData() {
    const select = document.querySelector('.select') as HTMLSelectElement;
    const selectOptions = select.value.split('-');

    if (selectOptions[0] === 'name') {
        Sort.sortByName(data, selectOptions[1]);
    } else {
        Sort.sortByPrice(data, selectOptions[1]);
    }

    const finalObj = createData();
    const cardsContainer = document.querySelector('.cards-container') as HTMLElement;
    cardsContainer.innerHTML = '';
    data.forEach((car) => {
        if (
            finalObj.body.includes(car.body) &&
            finalObj.brand.includes(car.brand) &&
            finalObj.fuelType.includes(car.fuelType) &&
            finalObj.price[0] <= car.price &&
            finalObj.price[1] >= car.price &&
            finalObj.engineSize[0] <= car.engineSize &&
            finalObj.engineSize[1] >= car.engineSize &&
            `${car.brand} ${car.model}`.toLowerCase().includes(finalObj.search[0])
        ) {
            const card = new Card();
            card.create(car);
        }
    });
}

export default renderData;
