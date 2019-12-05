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
        this.imageCount = 4;
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
                    this.getRandomImages(this.images);
                })
    }
    makeQuery(mood){
        let output = this.randomize(mood);
        return output;
    }
    randomize(array){
        // Get the length of the array
        const arrLen = array.length;

        // If there is only 1 item in the array just return it
        if (arrLen < 2) return array[0];
        
        // If there is  more than one item in the array
        // pick a random item from the array
        const randI = Math.floor(Math.random() * arrLen);
        return array[randI];
    }
    getRandomImages(imageArray){
        const arrLen = imageArray.length;
        const output = [];

        for (let i = 0; i < this.imageCount; i++){
            const randI = Math.floor(Math.random() * arrLen);
            output.push(imageArray[randI]);
        }
        this.render(output);
    }
    render(imageArray){
        const arrLen = imageArray.length;

        for (let i = 0, section = 1; i < arrLen; i++, section++){
            $('.section-' + section)
                .css( `background-image`, `url(${imageArray[i]})`)
        }
    }
}