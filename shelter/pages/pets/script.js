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

let data = getFile('../../pets.json');

let cards = document.querySelectorAll('.card');
const popup = document.querySelector('.popup');
const popupInfo = document.querySelector('.popup-info');
const popupClose = document.querySelector('.popup-close');

for (let card of cards) {
    card.addEventListener('click', e => {
        let eventName = e.currentTarget.childNodes[3].textContent;
        let index = data.findIndex(element => element.name == eventName);
        popup.classList.add('open');
        writePopup(data[index]);
        document.body.classList.toggle('lock')
    })
}

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