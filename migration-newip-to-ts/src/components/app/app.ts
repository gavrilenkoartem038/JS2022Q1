import { INews } from '../../types/interface';
import { ISources } from '../../types/interface';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Sources from '../view/sources/sources';

class App {
    private controller: AppController;
    private view: AppView;
    private sources: Sources;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sources = new Sources();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: INews) => this.view.drawNews(data))
        );
        (document.querySelector('main') as HTMLElement).addEventListener('click', (e) => this.sources.show(e));
        this.controller.getSources((data: ISources) => this.view.drawSources(data));
    }
}

export default App;
