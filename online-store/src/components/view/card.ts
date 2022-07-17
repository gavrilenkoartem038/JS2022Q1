import { Car } from '../../types/interface';

class Card {
    public create(data: Car, inCart?: boolean): void {
        const card = document.createElement('div') as HTMLElement;
        card.classList.add('card');
        if (inCart) {
            card.classList.add('in-cart');
        }
        card.id = data.id;
        card.innerHTML = `<h3>${data.brand} ${data.model}</h3>
        <div class="image-container">
          <img src="./assets/images/${data.image}">    
        </div>
        <div>Body type: ${data.body}</div>
        <div>Fuel type: ${data.fuelType}</div>
        <div>Engile size: ${data.engineSize}l</div>
        <div class="price-value">Price: ${data.price}$</div>
        <div class='cart-button ${inCart ? 'in-cart' : ''}'>${inCart ? 'In cart' : 'Add to cart'}</div>`;
        (document.querySelector('.cards-container') as HTMLElement).append(card);
    }
}

export default Card;
