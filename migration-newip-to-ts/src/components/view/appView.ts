import News from './news/news';
import Sources from './sources/sources';
import { ISources, INews, INew, ISource } from '../../types/interface';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INews) {
        const values: INew[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISources) {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
