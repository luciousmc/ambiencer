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
    this.imgCount = 4;
  }

  getImages(mood){

    // Set options for API call
    const imageParams = {
      q: this.makeQuery(this.moodVariations[mood]),
      key: this.apiKey
    }

    // Uses jQuery's getJSON to get images from pixabay API
    $.getJSON('https://pixabay.com/api/', imageParams)
      .done((response)=>{
        this.images = response.hits.map((hit)=>{
          return hit.largeImageURL;
        })

        // Reduces the list of images to the amount desired via this.imgCount
        const imagesToDisplay = shared.reduceResultByAmt(this.images, this.imgCount);

        // Pass the remaining images to this.render to be displayed on the DOM
        this.render(imagesToDisplay);
      })
  }
  makeQuery(mood){
    const output = shared.randomize(mood);
    return output;
  }
  render(imageArray){
    const arrLen = imageArray.length;

    // Loops through the sections on the DOM and adds the images to them via CSS
    for (let i = 0, section = 1; i < arrLen; i++, section++){
      $('.section-' + section)
        .css({ 
          'background-image': `url(${imageArray[i]})`,
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'position': 'relative',
          'z-index:': '-2'
        })       
    }
  }
}