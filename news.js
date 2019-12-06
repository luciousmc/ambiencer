class NewsApi {
    constructor(keys){
        this.endpoint = 'https://newsapi.org/v2/everything';
        this.apiKey = keys.news;
        this.articleAmt = 6;
        this.moodVariations = {
            happy: ['happy', 'cheerful', 'laugh', 'smile'],
            sad: ['sad', 'gloomy', 'sorrow'],
            romantic: ['love', 'roses', 'sappy', 'romantic'],
            hype: ['exciting', 'hype', 'party', 'rave'],
            chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
            motivated: ['confident', 'motivational']
        }
    }
    getNews(mood){
        const ajaxOptions = {
            apiKey: this.apiKey,
            qInTitle: this.makeQuery(mood),
            language: 'en',
            sortBy: 'relevancy'
        }
        $.getJSON(this.endpoint, ajaxOptions)
                .done((result)=>{
                    console.log('the news result object is', result);
                    const {articles} = result;
                    const newsToDisplay = shared.reduceResultByAmt(articles, this.articleAmt);
                    this.render(newsToDisplay);
                })
                .fail((err)=>{
                    console.log('there was an error ', err);
                })
    }
    makeQuery(mood){
        let output = this.randomize(this.moodVariations[mood]);
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
    render(newsArray){
        
    }
}