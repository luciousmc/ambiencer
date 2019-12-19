class GifAPI {
    constructor(keys){
        this.endpoint = 'api.giphy.com/v1/gifs/search'
        this.apiKey = keys.gifs;

    }
    getGifs(mood){
        const ajaxOptions = {
            api_key: this.apiKey,
            lang: 'en',
            q: this.makeQuery(mood)
        }
    }
    makeQuery(mood){}
    render(){}
}