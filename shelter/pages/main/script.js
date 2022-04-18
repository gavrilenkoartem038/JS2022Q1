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