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
                    debugger;
                    const newsToDisplay = shared.reduceResultByAmt(articles, this.articleAmt);
                    this.render(newsToDisplay);
                })
                .fail((err)=>{
                    console.log('there was an error ', err);
                })
    }
    makeQuery(mood){
        const output = shared.randomize(this.moodVariations[mood]);
        return output;
    }
    render(newsArray){
        console.log('the news.render function has this array...', newsArray)
        const arrLen = newsArray.length;
        let container = $('#news-content-container');
        let ul = $('<ul>').addClass('news-list');

        for (let i = 0; i < arrLen; i++){
            let li = $('<li>').addClass('news-item ' + i);
            li.text(newsArray[i].title);
            ul.append(li);
        }

        container.append(ul);
    }
}