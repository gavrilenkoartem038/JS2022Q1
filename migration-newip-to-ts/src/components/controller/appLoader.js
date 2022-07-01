import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd0e53456cdff4a80807662492474aeb1',
        });
    }
}

export default AppLoader;
