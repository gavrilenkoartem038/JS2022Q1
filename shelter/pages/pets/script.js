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

dark.addEventListener('click', closeNav);

function getFile (fileName) {
    let  request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return  JSON.parse(request.responseText);
}

let dataPets = getFile('../../pets.json');

const popup = document.querySelector('.popup');
const popupInfo = document.querySelector('.popup-info');
const popupClose = document.querySelector('.popup-close');

let cardContainer = document.querySelector('.card-container')

cardContainer.addEventListener('click', e => {
    if(e.target.closest('.card')){
        let eventName = e.target.closest('.card').childNodes[1].textContent;
        let index = dataPets.findIndex(element => element.name == eventName);
        popup.classList.add('open');
        writePopup(dataPets[index]);
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

const popupDark = document.querySelector('.popup-dark')

popupClose.addEventListener('click', () => closePopup())
popupDark.addEventListener('click', () => closePopup())

//pagination
let pagArray = [];
let currentPageNumber = 1;

let counter = document.documentElement.clientWidth >= 1280 ? 8 : document.documentElement.clientWidth < 768 ? 3 : 6;

function createRandomArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

let indexArray = [0, 1, 2, 3, 4, 5, 6, 7];

function createPaginationArray(arr) {
    arr = createRandomArray(arr);
    arr = arr.concat(arr, arr, arr, arr, arr);
    for (let i = 0; i < arr.length; i += counter) {
        let part = arr.slice(i, i + counter);
        pagArray.push(createRandomArray(part));
    }
    return pagArray;
}
createPaginationArray(indexArray)

function addPets(data) {
    let array = [];
    array.push(...pagArray[currentPageNumber - 1])
    array.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');       
        const image = document.createElement('img');
        image.src = `${data[item].img}`;
        image.alt = `${data[item].name}`;
        const name = document.createElement('span');
        name.textContent = `${data[item].name}`;
        const button = document.createElement('a');
        button.classList.add('secondary-button');
        button.textContent = 'Learn more';
        cardContainer.append(card);
        card.append(image);
        card.append(name);
        card.append(button);
    })
}

addPets(dataPets)

function changeWindowWidth() {
    let numOfCards = document.documentElement.clientWidth >= 1280 ? 8 : document.documentElement.clientWidth < 768 ? 3 : 6;
    
    if (numOfCards != counter) {
        counter = numOfCards;
        cardContainer.innerHTML = '';
        pagArray = []
        currentPageNumber = 1;
        pageButton.textContent = `${currentPageNumber}`;
        disableButtons(leftButton, firstPageButton);
        enableButtons(rightButton, lastPageButton)
        createPaginationArray(indexArray)
        addPets(dataPets)
    }
}

window.addEventListener(`resize`, changeWindowWidth);

function changePage() {
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => card.classList.add('slowChanges'))
    setTimeout(clearInner, 500, cardContainer)
    setTimeout(addPets, 500, dataPets);
}

function clearInner(node) {
    node.innerHTML = ''
}

const firstPageButton = document.querySelector('.first-page-button')
const lastPageButton = document.querySelector('.last-page-button')
const leftButton = document.querySelector('.left-button')
const rightButton = document.querySelector('.right-button')
const pageButton = document.querySelector('.page')

function disableButtons (firstButton, secondButton) {
    firstButton.classList.add('disabled')
    secondButton.classList.add('disabled')
}

function enableButtons (firstButton, secondButton) {
    firstButton.classList.remove('disabled')
    secondButton.classList.remove('disabled')
}

rightButton.addEventListener('click', () => {
    if (currentPageNumber < 48/counter) {
        enableButtons (leftButton, firstPageButton);
        currentPageNumber += 1;
        pageButton.textContent = `${currentPageNumber}`
        if (currentPageNumber == 48 / counter) disableButtons(rightButton, lastPageButton)
    }
    changePage()
})

leftButton.addEventListener('click', () => {
    if (currentPageNumber > 1) {
        enableButtons (rightButton, lastPageButton);
        currentPageNumber -= 1;
        pageButton.textContent = `${currentPageNumber}`
        if (currentPageNumber == 1) disableButtons(leftButton, firstPageButton)
    }
    changePage()
})

firstPageButton.addEventListener('click', () => {
    enableButtons(rightButton, lastPageButton);
    currentPageNumber = 1;
    pageButton.textContent = `${currentPageNumber}`;
    disableButtons(leftButton, firstPageButton);
    changePage()
})

lastPageButton.addEventListener('click', () => {
    enableButtons(leftButton, firstPageButton);
    currentPageNumber = 48/counter;
    pageButton.textContent = `${currentPageNumber}`;
    disableButtons(rightButton, lastPageButton);
    changePage()
})
