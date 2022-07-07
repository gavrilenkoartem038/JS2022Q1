import News from './news/news';
import Sources from './sources/sources';
import { ISources, INews, INew, ISource } from '../../types/interface';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: INews): void {
        const values: INew[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
