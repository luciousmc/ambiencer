class GifAPI {
    constructor(keys){
        this.endpoint = 'http://api.giphy.com/v1/gifs/search'
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
        $.getJSON(this.endpoint, ajaxOptions)
                .done((result)=>{
                    let gifToDisplay = shared.reduceResultByAmt(result.data, 1);
                    gifToDisplay = gifToDisplay.images.original.url;
                    this.render(gifToDisplay);
                })
                .fail((err)=>{
                    console.log('there was an error: ', err);
                })
    }
    makeQuery(mood){
        const output = shared.randomize(this.moodVariations[mood])
        return output;
    }
    render(gif){
        let container = $('#gif-content-container');
        let img = $('<img>').attr({
                                class: 'gif',
                                src: gif,
                                alt: 'Animated GIF'
                            })
        container.append(img);
    }
}