import createSliders from './components/view/createSliders';
import renderData from './components/view/renderData';
import './style.scss';

createSliders();
renderData();
document.addEventListener('click', renderData);
(document.querySelector('.search') as HTMLInputElement).addEventListener('input', renderData);
