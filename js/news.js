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

    // Article image
    const container = $('<div>').attr('id', 'news-article-container');
    const imgContainer = $('<div>').addClass('article-image-container');
    const articleImg = $('<img>').attr({
                                  src: article.urlToImage,
                                  alt: 'Article Image',
                                  class: 'article-image'
                                });
    imgContainer.append(articleImg);
    container.append(imgContainer);
      
    // Article title
    const articleTitleContainer = $('<div>').addClass('article-title-container');
    const articleTitle = $('<h3>').addClass('article-title').text(article.title);
    articleTitleContainer.append(articleTitle);
    container.append(articleTitleContainer);
    
    // Article preview text
    const articleContentContainer = $('<div>').addClass('article-content-container');
    const articleContent = $('<p>').addClass('article-content').text(article.content);
    articleContentContainer.append(articleContent);
    container.append(articleContentContainer);

    const buttonsContainer = $('<div>').addClass('buttons-container');
    container.append(buttonsContainer);
    
    const backButtonContainer = $('<div>').addClass('back-button-container');
    const backButton = $('<div>')
                        .addClass('article-back-button')
                        .text('Back to List')
                        .on('click', (event)=>{
                            $(container).fadeOut(600, ()=>{
                                $('#news-content-container').fadeIn(600)
                            })
                        })
    backButtonContainer.append(backButton);
    buttonsContainer.append(backButtonContainer);

    // Button that takes user to full article when clicked
    const readArticleContainer = $('<div>').addClass('read-article-button-container');
    const readArticleButton = $('<div>')
                              .addClass('read-article-button')
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

    // Get the amount of articles in the array
    const arrLen = newsArray.length;
    const container = $('#news-content-container');
    const ul = $('<ul>').addClass('news-list');

    // Render each article to the DOM
    // Add a click handler to each article that will render details of that article
    for (let i = 0; i < arrLen; i++){
      const li = $('<li>')
        .addClass('news-item ' + (i+1))
        .on('click', (event)=>{
            container.fadeOut(600, ()=>{ this.renderArticle(newsArray[i]) });
        });

      // Use the article title as the text for the list item
      li.text(newsArray[i].title);
      ul.append(li);
    }
    // Append the list to the DOM
    container.append(ul);
    this.container = container;
  }
}