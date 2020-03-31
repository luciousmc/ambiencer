class GifAPI {
  constructor(keys){
    this.endpoint = 'https://api.giphy.com/v1/gifs/search'
    this.apiKey = keys.gifs;
    this.moodVariations = {
      happy: ['happy', 'cheerful', 'laugh', 'smile'],
      sad: ['sad', 'gloomy', 'sorrow'],
      romantic: ['love', 'roses', 'sappy', 'romantic'],
      hype: ['exciting', 'hype', 'party', 'rave'],
      chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
      motivated: ['confident', 'motivational']
    }
  }
  getGifs(mood){
    
    // Set the option for the AJAX call
    const ajaxOptions = {
      api_key: this.apiKey,
      lang: 'en',
      q: this.makeQuery(mood)
    }

    // Uses jQuery's getJSON method to get GIF images based on the mood
    $.getJSON(this.endpoint, ajaxOptions)
      .done((result)=>{

        // Uses shared function 'reduceResultByAmt' to assign a single GIF from the list of GIFs
        let gifToDisplay = shared.reduceResultByAmt(result.data, 1);
        gifToDisplay = gifToDisplay.images.original.url;

        // Send the GIF to the render method to be displayed on the DOM
        this.render(gifToDisplay);
      })
      .fail((err)=>{
        console.log('there was an error: ', err);
      })
  }
  makeQuery(mood){
    // Pick a random search term from the list 
    const output = shared.randomize(this.moodVariations[mood])
    return output;
  }
  render(gif){
    // Select the GIF container to add content to
    const container = $('#gif-content-container');

    // Create an img element with the returned GIF url
    const img = $('<img>')
      .attr({
        class: 'gif',
        src: gif,
        alt: 'Animated GIF'
      })
    container.append(img);
  }
}