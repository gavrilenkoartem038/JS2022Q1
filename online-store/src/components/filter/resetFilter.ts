import * as noUiSlider from 'nouislider';

function resetFilter(): void {
    const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[type=checkbox]`);
    const search = document.querySelector('.search') as HTMLInputElement;
    const engineSize = document.querySelector('.engineSize') as noUiSlider.target;
    const price = document.querySelector('.price') as noUiSlider.target;

    checkboxElements.forEach((el): void => {
        if (el.checked) {
            el.click();
        }
    });
    search.value = '';
    (engineSize.noUiSlider as noUiSlider.API).set([1.4, 4.0]);
    (price.noUiSlider as noUiSlider.API).set([14.39, 73.49]);
}

export default resetFilter;
