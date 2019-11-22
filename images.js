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
    }
    getImages(mood){
        const imageParams = {
            query: this.makeQuery(mood),
            client_id: this.apiKey,
            orientation: 'landscape',
        }
        const ajaxOptions = {
            url: 'https://api.unsplash.com',
            method: 'GET',
            dataType: 'JSON',
            // headers: {
            //     'Accept-Version': 'v1'
            // },
            data: imageParams,
        }
        $.ajax(ajaxOptions)
            .done((data)=>{
                console.log('the data returned is: ', data);
            });
    }
    makeQuery(mood){
        let output = this.moodVariations[mood][0];
        return output;
    }
    render(){}
}