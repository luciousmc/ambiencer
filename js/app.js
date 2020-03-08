
class App {
  constructor(apiKeys) {

    // Instantiate API classes
    this.clock = new Clock();
    this.weather = new Weather();
    this.music = new MusicPlayer(apiKeys);
    this.images = new ImageApi(apiKeys);
    this.news = new NewsApi(apiKeys);
    this.gifs = new GifAPI(apiKeys);
    this.poems = new PoemsAPI();
  }

  init() {
    this.addEventListeners();
    this.clock.init();
    this.weather.init();
  }

  addEventListeners(){
    // mood buttons click handler
    // Takes text from the mood button clicked and calls switchmood() to generate its content
    $('.mood-button-container').on('click', 'button', (event)=>{
        const moodText = event.currentTarget.firstChild.textContent;
        this.switchMood(moodText.toLowerCase());

        // Fade out the main page and fade in the content page
        $('#main-page').fadeOut(700);
        $('#content-page').fadeIn(700);
    })

    // Change mood click handler
    // Removes all content previously loaded
    $('.change-mood').on('click', (event)=>{
        $('#main-page').fadeIn(700);
        $('#content-page').fadeOut(700);
        $('.video-container').empty();
        $('#news-content-container').empty().show();
        $('#news-article-container').remove();
        $('#gif-content-container').empty();
        $('#poem-content-container').empty();
        $('.poem-title-container').empty();
    })
  }

  // Receives a mood and calls necessary functions to retrieve content
  switchMood (mood){
    // Place the current mood on the DOM
    $('.current-mood').html(`${mood.toUpperCase()}`);

    // Generates custom hearder for specific mood
    // Calls all Api's passing the current mood 
    this.generateHeaderText(mood);
    this.music.getMusic(mood);
    this.images.getImages(mood);
    this.news.getNews(mood);
    this.gifs.getGifs(mood);
    this.poems.getPoems(mood);
  }
  
  generateHeaderText(mood){

    // Selects header elements
    const musicHeader = $('#music h1');
    const poemHeader = $('#poem h1');
    const newsHeader = $('#news h1');
    const gifHeader = $('#gif h1');

    // Custom Header text based on the mood
    switch(mood){
      case 'happy':
        musicHeader.text('Lift your spirit with a song');
        poemHeader.text('Think happy thoughts');
        newsHeader.text('Get some heartwarming news');
        gifHeader.text('Smile!');
        break;
      case 'sad':
        musicHeader.text('Let the floodgates open..');
        poemHeader.text('Deep into the burrows of your heart');
        newsHeader.text('Stories sure to tug the heartstrings');
        gifHeader.text('And a lonely GIF');
        break;
      case 'chill':
        musicHeader.text('Relax your mind');
        poemHeader.text('Grab a cup o\' joe');
        newsHeader.text('Some casual reading for you');
        gifHeader.text('A GIF from us to you, friend. -_o');
        break;
      case 'hype':
        musicHeader.text('Let\'s get the party started..');
        poemHeader.text('Legit poems to check out');
        newsHeader.text('What\'s poppin\' in the news');
        gifHeader.text('Yeet');
        break;
      case 'romantic':
        musicHeader.text('Set the mood right with a song');
        poemHeader.text('My cherie, amour');
        newsHeader.text('Love is in the air');
        gifHeader.text('And Somthin\' special');
        break;
      case 'motivated':
        musicHeader.text('Get pumped up');
        poemHeader.text('Find inspiration from your soul');
        newsHeader.text('Articles to motivate');
        gifHeader.text('Do work');
        break;
      default:
        break;
    }
  }
}