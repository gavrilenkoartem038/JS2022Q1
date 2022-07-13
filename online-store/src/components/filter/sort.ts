import { Car } from '../../types/interface';

class Sort {
    public static sortByName(object: Car[], value: string): Car[] {
        object.sort((a: Car, b: Car) => {
            if (a.brand + a.model < b.brand + b.model) {
                return -1;
            } else {
                return 1;
            }
        });
        if (value === 'min') {
            return object;
        } else {
            return object.reverse();
        }
    }
    public static sortByPrice(object: Car[], value: string): Car[] {
        object.sort((a: Car, b: Car) => {
            if (a.price < b.price) {
                return -1;
            } else {
                return 1;
            }
        });
        if (value === 'min') {
            return object;
        } else {
            return object.reverse();
        }
    }
}

export default Sort;
