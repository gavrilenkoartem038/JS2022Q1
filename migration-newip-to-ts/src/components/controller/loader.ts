class Loader {
    protected constructor(private baseLink: string, private options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RespType,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseCode.Unauthorized || res.status === ResponseCode.PageNotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    private load<Data>(method: 'GET' | 'POST', endpoint: string, callback: (data: Data) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: Data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

type RespType = {
    endpoint: string;
    options?: { [key: string]: string };
};

enum ResponseCode {
    OK = 200,
    Unauthorized = 401,
    PageNotFound = 404,
}

export type Callback<T> = (data: T) => void;
