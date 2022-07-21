import { Car } from '../../types/interface';

class Sort {
    public static sortByName(carList: Car[], value: string): Car[] {
        carList.sort((car1: Car, car2: Car) => {
            if (car1.brand + car1.model < car2.brand + car2.model) {
                return -1;
            } else {
                return 1;
            }
        });
        if (value === 'min') {
            return carList;
        } else {
            return carList.reverse();
        }
    }
    public static sortByPrice(carList: Car[], value: string): Car[] {
        carList.sort((car1: Car, car2: Car) => {
            if (car1.price < car2.price) {
                return -1;
            } else {
                return 1;
            }
        });
        if (value === 'min') {
            return carList;
        } else {
            return carList.reverse();
        }
    }
}

export default Sort;
