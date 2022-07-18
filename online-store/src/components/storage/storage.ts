import { FinalObj } from '../../types/interface';
import setCheckboxStorage from './checkboxStorage';
import * as noUiSlider from 'nouislider';

class Storage {
    private static search = document.querySelector('.search') as HTMLInputElement;
    private static select = document.querySelector('.select') as HTMLInputElement;
    private static popular = document.querySelector('#popular') as HTMLInputElement;
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
            popular: false,
        };
        storageObject.search[0] = this.search.value;
        storageObject.brand = setCheckboxStorage('brand');
        storageObject.body = setCheckboxStorage('body');
        storageObject.fuelType = setCheckboxStorage('fuelType');
        storageObject.price = (this.price.noUiSlider as noUiSlider.API).get() as string[];
        storageObject.engineSize = (this.engineSize.noUiSlider as noUiSlider.API).get() as string[];
        storageObject.popular = this.popular.checked ? true : false;
        localStorage.setItem('storageObject', JSON.stringify(storageObject));
        localStorage.setItem('sortOrder', this.select.value);
    }

    public static getStorage(): FinalObj {
        const storageObject = JSON.parse(localStorage.getItem('storageObject') as string) as FinalObj;
        this.setSettings(storageObject);
        this.select.value = localStorage.getItem('sortOrder') as string;
        return storageObject;
    }

    public static setSettings(object: FinalObj): void {
        this.search.value = object.search[0];
        this.clickCheckboxes('brand', object);
        this.clickCheckboxes('body', object);
        this.clickCheckboxes('fuelType', object);
        (this.price.noUiSlider as noUiSlider.API).set(object.price);
        (this.engineSize.noUiSlider as noUiSlider.API).set(object.engineSize);
        if (object.popular) {
            this.popular.click();
        }
    }

    private static clickCheckboxes(name: string, object: FinalObj): void {
        const checkboxElements = document.querySelectorAll<HTMLInputElement>(`input[name=${name}]`);
        checkboxElements.forEach((el): void => {
            if (
                (object[name as keyof typeof object] as string[]).includes(el.id) &&
                (object[name as keyof typeof object] as string[]).length !== checkboxElements.length
            ) {
                el.click();
            }
        });
    }
}

export default Storage;
