import carList from '../src/data';
import Sort from '../src/components/filter/sort';

describe('sort tests', () => {
    it('sortByName a-z', () => {
        Sort.sortByName(carList, 'min');
        expect(carList[0].model).toEqual('3');
        expect(carList[5].id).toEqual('19');
        expect(carList[22].id).toEqual('7');
    });

    it('sortByName z-a', () => {
        Sort.sortByName(carList, 'max');
        expect(carList[0].model).toEqual('Polo');
        expect(carList[6].id).toEqual('15');
        expect(carList[17].model).toEqual('Accent');
    });

    it('sortByPrice lowest', () => {
        Sort.sortByPrice(carList, 'min');
        expect(carList[0].price).toEqual('14.390');
        expect(carList[10].price).toEqual('29.890');
        expect(carList[22].price).toEqual('73.490');
    });

    it('sortByPrice highest', () => {
        Sort.sortByPrice(carList, 'max');
        expect(carList[0].price).toEqual('73.490');
        expect(carList[15].price).toEqual('25.890');
        expect(carList[22].price).toEqual('14.390');
    });
});
