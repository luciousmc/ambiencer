class ImageApi {
    constructor(keys){
        this.moodVariations = {
            happy: ['happy', 'cheerful'],
            sad: ['sad', 'depressing'],
            romantic: ['love', 'romantic', 'sappy'],
            hype: ['hyphy', 'hype', 'party'],
            chill: ['lo-fi', 'relaxing'],
            motivated: ['party', 'motivational']
        }
        this.apiKey = keys.images;
        this.images = [];
    }
    getImages(mood){
        const imageParams = {
            q: this.makeQuery(mood),
            // image_type: 'photo',
            // orientation: 'horizontal',
            key: this.apiKey
        }
        $.getJSON('https://pixabay.com/api/', imageParams)
                .done((response)=>{
                    console.log('the response was ', response);
                    this.images = response.hits.map((hit)=>{
                        return hit.largeImageURL;
                    })
                    this.render(this.images);
                })
    }
    makeQuery(mood){
        let output = this.moodVariations[mood][0];
        return output;
    }
    render(imageArray){
        for (let section = 1, imageI = 0; section < 5; section++, imageI++){
            $('.section-' + section).css( `background-image`, `url(${imageArray[imageI]})`)
        }
    }
}