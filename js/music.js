
class MusicPlayer {
  constructor(keys){
    this.moodVariations = {
      happy: ['happy', 'cheerful'],
      sad: ['sad', 'depressing'],
      romantic: ['love', 'romantic', 'sappy'],
      hype: ['hyphy', 'hype', 'party'],
      chill: ['lo-fi', 'relaxing'],
      motivated: ['party', 'motivational']
    }
    this.apiKey = keys.music;
  }
  getMusic(mood){

    // Options for the query using youtube specs
    const queryOptions = {
      part: 'snippet',
      fields: 'items(id, snippet(title, description))',
      videoEmbeddable: 'true',
      type: 'video',
      videoLicense: 'creativeCommon',
      key: this.apiKey,
      q: this.makeQuery(mood)
    }

    // Send GET request to YouTube API and pass the result to this.render to be displayed on the DOM
    $.getJSON('https://www.googleapis.com/youtube/v3/search', queryOptions)
      .done((response)=>{
        this.render(response.items);
      })
      .fail((err)=>{
        console.log('there was an error: ', err)
      })
  }

  // Makes a query from the list of words for mood variations
  makeQuery(mood){
    const moodWords = this.moodVariations[mood];
    const moodsLen = moodWords.length;
    let output = '';

    for (let i = 0; i < moodsLen; i++){
      output += moodWords[i] + ' music || '; 
    }
    return output;
  }
  generateYoutubeOptions(videoArray){
    // returns a query string with youtube options
    const video = shared.randomize(videoArray);
    let output = '';

    const youtubeOptions = {
      id: video.id.videoId,       // video ID
      fs: '0',                    // disable full screen button
      autoplay: '1',              // autoplay video when it loads
      disablekb: '1',             // disable keyboard functions on video
      iv_load_policy: '3',        // disable any annotations a video may have
      modestbranding: '1',        // removes youtube logo
    }

    // Build st ring query
    for (let prop in youtubeOptions){
      let val = youtubeOptions[prop];

      // If output is an empty string add first value followed by '?'
      if (output === ''){
          output += `${val}?`;

      // If last character is not a '?' add the next key/value pair preceded by a '&'
      } else if (output[output.length-1] !== '?'){
          output += `&${prop}=${val}`;
      } else {
          output += `${prop}=${val}`;
      }
    }
    return output;
  }
  render(results){
    const yt_baseURL = 'http://www.youtube.com/embed/';
    const yt_options = this.generateYoutubeOptions(results);

    // Create an iframe element and use the finaly query string
    let iFrame = $('<iframe>');
    iFrame.attr({
        type: 'text/html',
        width: 720,
        height: 405,
        src: `${yt_baseURL}${yt_options}`,
        frameborder: 0,
        allow: 'encrypted-media; accelerometer; gyroscope;'
    })

    // Append the video to the DOM
    $('.video-container').append(iFrame);
  }
}