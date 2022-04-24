const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-menu');
const dark = document.querySelector('.dark');
const headerInfo = document.querySelector('.header-info');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('lock');
    dark.classList.toggle('visible');
    headerInfo.classList.toggle('hidden');
});

function closeNav() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    document.body.classList.remove('lock');
    dark.classList.remove('visible');
    headerInfo.classList.remove('hidden');
}

nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('link')) {
        closeNav();
    }
});

dark.addEventListener('click', closeNav)


//popup

function getFile (fileName) {
    let  request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return  JSON.parse(request.responseText);
}

let data = getFile('../../pets.json');

let cards = document.querySelectorAll('.card');
const popup = document.querySelector('.popup');
const popupInfo = document.querySelector('.popup-info');
const popupClose = document.querySelector('.popup-close');

let container = document.querySelector('.slider-cards-container')


container.addEventListener('click', e => {
    if(e.target.closest('.card')){
        let eventName = e.target.closest('.card').childNodes[3].textContent;
        let index = data.findIndex(element => element.name == eventName);
        popup.classList.add('open');
        writePopup(data[index]);
        document.body.classList.toggle('lock')
    }
})

function writePopup(jsonCard) {
    let img = document.querySelector('.popup-img');
    img.src = jsonCard.img;
    for (let key in jsonCard) {
        if (key != 'img') document.querySelector(`.popup-${key}`).textContent = jsonCard[`${key}`]
    }
}

function closePopup () {
    popup.classList.remove('open');
    document.body.classList.remove('lock');
}

popupClose.addEventListener('click', () => closePopup())
popup.addEventListener('click', e => {
    if (e.target == popup) closePopup();
})

//slider
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

let numberOfCards = document.documentElement.clientWidth >= 1280 ? 3 : document.documentElement.clientWidth < 768 ? 1 : 2;

function changeWindowWidth() {
    let numOfcards = document.documentElement.clientWidth >= 1280 ? 3 : document.documentElement.clientWidth < 768 ? 1 : 2;
    
    if (numOfcards != numberOfCards) {
        numberOfCards = numOfcards;
    }
}

window.addEventListener(`resize`, changeWindowWidth);

function chooseCardsOnPage() {
    let cardsOnPageNames = [];
    let cardsOnPage = document.querySelectorAll('.card')
    for (let i = 0; i < numberOfCards; i++) {
        cardsOnPageNames.push(cardsOnPage[i].childNodes[3].textContent)
    }
    return cardsOnPageNames;
}


function chooseNewCards() {
    let freeCards = data.filter((item) => !chooseCardsOnPage().includes(item.name));
    let selectedCards = [];
  
    for (let i = 0; i < 3; i++) {
        let pet = freeCards[Math.floor(Math.random() * freeCards.length)];
        selectedCards.push(pet);
        freeCards = freeCards.filter((pet) => !selectedCards.includes(pet));
    }
    createNewCards(selectedCards)
}

function createNewCards(pets) {
    const sliderContainer = document.querySelector('.slider-cards-container')
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    cardContainer.classList.add('new')
  
    pets.forEach((pet) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      card.innerHTML = `
              <img src="${pet.img}" alt="${pet.name}">
              <span>${pet.name}</span>
              <a class="secondary-button">Learn more</a>
          `;
  
      cardContainer.append(card);
    });
    sliderContainer.prepend(cardContainer);
}

function changeSlides() {
    const previousCards = document.querySelector(".card-container");
    previousCards.classList.remove('new')
    previousCards.classList.add("previous");
    chooseNewCards();
    setTimeout(() => previousCards.remove(), 1000);
}

buttonLeft.addEventListener('click', e => {
    changeSlides();
    const newContainer = document.querySelector(".new");
    const previousContainer = document.querySelector(".previous");
    newContainer.style.animation = 'fromRight 1s 1'
    previousContainer.style.animation = 'toLeft 1s 1'
})

buttonRight.addEventListener('click', e => {
    changeSlides();
    const newContainer = document.querySelector(".new");
    const previousContainer = document.querySelector(".previous");
    newContainer.style.animation = 'fromLeft 1s 1'
    previousContainer.style.animation = 'toRight 1s 1'
})
