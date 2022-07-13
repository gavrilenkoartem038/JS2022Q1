import { Car } from '../../types/interface';

class Card {
    public create(data: Car): void {
        const card = document.createElement('div') as HTMLElement;
        card.classList.add('card');
        card.innerHTML = `<div class="${data.brand}">${data.brand}</div>
        <div class="${data.model}">${data.model}</div>
        <div class="image-container">
          <img src="./assets/images/${data.image}">    
        </div>
        <div class="${data.body}">${data.body}</div>
        <div class="${data.fuelType}">${data.fuelType}</div>
        <div class="${data.engineSize}">${data.engineSize}</div>
        <div class="${data.price}">${data.price}$</div>`;
        (document.querySelector('.cards-container') as HTMLElement).append(card);
    }
}

export default Card;
