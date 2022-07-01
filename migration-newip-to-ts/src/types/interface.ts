export interface INew {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source: {
        id: string;
        name: string;
    };
}

export interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface INews {
    status: string;
    totalResults: number;
    articles: INew[];
}

export interface ISources {
    status: string;
    sources: ISource[];
}
