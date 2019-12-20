class GifAPI {
    constructor(keys){
        this.endpoint = 'api.giphy.com/v1/gifs/search'
        this.apiKey = keys.gifs;
        this.moodVariations = {
            happy: ['happy', 'cheerful', 'laugh', 'smile'],
            sad: ['sad', 'gloomy', 'sorrow'],
            romantic: ['love', 'roses', 'sappy', 'romantic'],
            hype: ['exciting', 'hype', 'party', 'rave'],
            chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
            motivated: ['confident', 'motivational']
        }
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