class ImageApi {
    constructor(keys){
        this.moodVariations = {
            happy: ['happy', 'cheerful', 'laugh', 'smile'],
            sad: ['sad', 'gloomy', 'sorrow'],
            romantic: ['love', 'roses', 'sappy', 'romantic'],
            hype: ['exciting', 'hype', 'party', 'rave'],
            chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
            motivated: ['confident', 'motivational']
        }
        this.apiKey = keys.images;
        this.images = [];
        this.imgCount = 4;
    }
    getImages(mood){
        const imageParams = {
            q: this.makeQuery(this.moodVariations[mood]),
            // image_type: 'photo',
            // orientation: 'horizontal',
            key: this.apiKey
        }
        $.getJSON('https://pixabay.com/api/', imageParams)
                .done((response)=>{
                    this.images = response.hits.map((hit)=>{
                        return hit.largeImageURL;
                    })
                    const imagesToDisplay = shared.reduceResultByAmt(this.images, this.imgCount);
                    this.render(imagesToDisplay);
                })
    }
    makeQuery(mood){
        let output = shared.randomize(mood);
        return output;
    }
    render(imageArray){
        const arrLen = imageArray.length;

        for (let i = 0, section = 1; i < arrLen; i++, section++){
            $('.section-' + section)
                .css({ 
                    'background-image': `url(${imageArray[i]})`,
                    'position': 'relative',
                })       
        }
    }
}