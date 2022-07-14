import { FinalObj } from '../../types/interface';
import setCheckboxStorage from './checkboxStorage';
import * as noUiSlider from 'nouislider';

class Storage {
    private static search = document.querySelector('.search') as HTMLInputElement;
    private static select = document.querySelector('.select') as HTMLInputElement;
    private static price = document.querySelector('.price') as noUiSlider.target;
    private static engineSize = document.querySelector('.engineSize') as noUiSlider.target;

    public static setStorage() {
        const storageObject: FinalObj = {
            brand: [],
            body: [],
            fuelType: [],
            engineSize: [],
            price: [],
            search: [],
            sortOrder: [],
        };
        storageObject.search[0] = this.search.value;
        storageObject.sortOrder[0] = this.select.value;
        storageObject.brand = setCheckboxStorage('brand');
        storageObject.body = setCheckboxStorage('body');
        storageObject.fuelType = setCheckboxStorage('fuelType');
        storageObject.price = (this.price.noUiSlider as noUiSlider.API).get() as string[];
        storageObject.engineSize = (this.engineSize.noUiSlider as noUiSlider.API).get() as string[];

        localStorage.setItem('storageObject', JSON.stringify(storageObject));
    }

    public static getStorage() {
        const storageObject = JSON.parse(localStorage.getItem('storageObject') as string) as FinalObj;
        this.setSettings(storageObject);
        return storageObject;
    }

    private static setSettings(object: FinalObj) {
        this.search.value = object.search[0];
        this.select.value = object.sortOrder[0];
        this.clickCheckboxes('brand', object);
        this.clickCheckboxes('body', object);
        this.clickCheckboxes('fuelType', object);
        (this.price.noUiSlider as noUiSlider.API).set(object.price);
        (this.engineSize.noUiSlider as noUiSlider.API).set(object.engineSize);
    }

    private static clickCheckboxes(name: string, object: FinalObj) {
        const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[name=${name}]`);
        checkboxElements.forEach((el): void => {
            if (
                object[name as keyof typeof object].includes(el.id) &&
                object[name as keyof typeof object].length !== checkboxElements.length
            ) {
                el.click();
            }
        });
    }
}

export default Storage;
