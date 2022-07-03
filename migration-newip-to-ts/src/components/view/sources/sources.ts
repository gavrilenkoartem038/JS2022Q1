import './sources.css';
import { ISource } from '../../../types/interface';

class Sources {
    draw(data: ISource[]) {
        const fragment = document.createDocumentFragment();
        const symbolsContainer = document.querySelector('.symbols-container') as HTMLElement;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const firstCharArr: string[] = [];

        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);

            if (!firstCharArr.includes(item.name[0])) {
                firstCharArr.push(item.name[0]);
            }
            (document.querySelector('.sources') as HTMLElement).append(fragment);
        });
        firstCharArr.forEach((elem) => {
            const symbolDiv = document.createElement('div');
            symbolsContainer.append(symbolDiv);
            symbolDiv.textContent = elem;
            symbolDiv.id = elem;
            symbolDiv.classList.add('symbol-category');
        });
    }

    show(e: Event) {
        const elem = e.target as HTMLElement;
        console.log(elem);
        if (elem.classList.contains('symbol-category')) {
            const elements = document.querySelectorAll('.source__item');
            elements.forEach((el) => {
                el.classList.add('hidden');
                if ((el.getAttribute('data-source-id') as string)[0] == elem.id.toLowerCase()) {
                    el.classList.remove('hidden');
                }
            });
        }
    }
}

export default Sources;
