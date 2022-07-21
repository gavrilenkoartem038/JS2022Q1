import * as noUiSlider from 'nouislider';

function resetFilter(): void {
    const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[type=checkbox]`);
    const search = document.querySelector('.search') as HTMLInputElement;
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    const price = document.querySelector('.price') as noUiSlider.target;

    const engineSizeMin = 1.4;
    const engineSizeMax = 4.0;
    const priceMin = 14.39;
    const priceMax = 73.49;

    checkboxElements.forEach((el): void => {
        if (el.checked) {
            el.click();
        }
    });
    search.value = '';
    (engineSize.noUiSlider as noUiSlider.API).set([engineSizeMin, engineSizeMax]);
    (price.noUiSlider as noUiSlider.API).set([priceMin, priceMax]);
}

export default resetFilter;
