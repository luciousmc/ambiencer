class NewsApi {
    constructor(keys){
        this.endpoint = 'https://newsapi.org/v2/everything';
        this.apiKey = keys.news;
        this.articleAmt = 6;
        this.container = $('#news-content-container');
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
        const output = shared.randomize(this.moodVariations[mood]);
        return output;
    }
    renderArticle(article){
        // to be displayed when an article title is clicked

        // Article image
        let container = $('<div>').attr('id', 'news-article-container');
        let imgContainer = $('<div>').addClass('article-image-container');
        let articleImg = $('<img>').attr({
                                        src: article.urlToImage,
                                        alt: 'Article Image',
                                        class: 'article-image'
                                    });
        imgContainer.append(articleImg);
        container.append(imgContainer);
        
        // Article title
        let articleTitleContainer = $('<div>').addClass('article-title-container');
        let articleTitle = $('<h3>').addClass('article-title').text(article.title);
        articleTitleContainer.append(articleTitle);
        container.append(articleTitleContainer);
        
        // Article preview text
        let articleContentContainer = $('<div>').addClass('article-content-container');
        let articleContent = $('<p>').addClass('article-content').text(article.content);
        articleContentContainer.append(articleContent);
        container.append(articleContentContainer);

        let buttonsContainer = $('<div>').addClass('buttons-container');
        container.append(buttonsContainer);
        
        let backButtonContainer = $('<div>').addClass('back-button-container');
        let backButton = $('<div>').addClass('article-back-button')
                                        .text('Back to List')
                                        .on('click', (event)=>{
                                            $(container).fadeOut(600, ()=>{
                                                $('#news-content-container').fadeIn(600)
                                            })
                                        })
        backButtonContainer.append(backButton);
        buttonsContainer.append(backButtonContainer);

        // Button that takes user to full article when clicked
        let readArticleContainer = $('<div>').addClass('read-article-button-container');
        let readArticleButton = $('<div>').addClass('read-article-button')
                                        .text('Read Full Article')
                                        .on('click', (event)=>{
                                            window.open(article.url, '_blank');                                            
                                        })
        readArticleContainer.append(readArticleButton);
        buttonsContainer.append(readArticleContainer);


        // Place the article container inside of section with a fade in effect
        $('.section-3').append(container);
        container.fadeIn();
    }
    render(newsArray){
        const arrLen = newsArray.length;
        let container = $('#news-content-container');
        let ul = $('<ul>').addClass('news-list');

        for (let i = 0; i < arrLen; i++){
            let li = $('<li>').addClass('news-item ' + (i+1))
                            .on('click', (event)=>{
                                container.fadeOut(600, ()=>{ this.renderArticle(newsArray[i]) });
                            });
            li.text(newsArray[i].title);
            ul.append(li);
        }
        container.append(ul);
        this.container = container;
    }
}