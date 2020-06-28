

class BingNews {
  constructor() {
    this.endpoint = 'https://bing-news-search1.p.rapidapi.com/news/search';
    this.moodVariations = {
      happy: ['happy', 'cheerful', 'laugh', 'smile'],
      sad: ['sad', 'gloomy', 'sorrow'],
      romantic: ['love', 'roses', 'sappy', 'romantic'],
      hype: ['exciting', 'hype', 'party', 'rave'],
      chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
      motivated: ['confident', 'motivational']
    }
    this.articleAmt = 6;
    this.container = $('#news-content-container');
  }
  async getNews(mood){

    const newsOptions = {
      count: this.articleAmt,
      freshness: 'Month',
      q: this.makeQuery(mood)
    }
    
    const ajaxOptions = {
      method: 'GET',
      data: newsOptions,
      headers: {
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "d4c459eef1msh9e5b5c683cdb80dp12d585jsna196dc321fa1",
        "x-bingapis-sdk": "true"
      }
    }

    try {
      const response = await $.ajax(this.endpoint, ajaxOptions);
      console.log({response});
    } catch (error) {
      console.log({error})
    }

  }
  makeQuery(mood){
    const output = shared.randomize(this.moodVariations[mood]);
    return output;
  }
  render() {}
}

// fetch("https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Off&q=bunnies", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
// 		"x-rapidapi-key": "d4c459eef1msh9e5b5c683cdb80dp12d585jsna196dc321fa1",
// 		"x-bingapis-sdk": "true"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });
