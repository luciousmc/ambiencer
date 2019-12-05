
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
        const queryOptions = {
            part: 'snippet',
            fields: 'items(id, snippet(title, description))',
            videoEmbeddable: 'true',
            type: 'video',
            videoLicense: 'creativeCommon',
            key: this.apiKey,
            q: this.makeQuery(mood)
        }
        $.getJSON('https://www.googleapis.com/youtube/v3/search', queryOptions)
            .done((response)=>{
                console.log('Succes! the response is: ', response);
                this.render(response.items);
            })
            .fail((err)=>{
                console.log('there was an error: ', err)
            })
    }
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
        console.log('the video is ', video);
        let output = '';

        const youtubeOptions = {
            // listType: 'playlist',       // load a playlist
            // list: video.id.playlistId,  // playlist ID
            id: video.id.videoId,       // video ID
            fs: '0',                    // disable full screen button
            autoplay: '1',              // autoplay video when it loads
            disablekb: '1',             // disable keyboard functions on video
            iv_load_policy: '3',        // disable any annotations a video may have
            modestbranding: '1',        // removes youtube logo
        }

        for (let prop in youtubeOptions){
            let val = youtubeOptions[prop];
            if (output === ''){
                output += `${val}?`;
            } else if (output[output.length-1] !== '?'){
                output += `&${prop}=${val}`;
            } else {
                output += `${prop}=${val}`;
            }
        }
        return output;
    }
    render(results){
        console.log('should be an array of video objects ', results);
        const yt_baseURL = 'http://www.youtube.com/embed/';
        const yt_options = this.generateYoutubeOptions(results);

        let iFrame = $('<iframe>');
        iFrame.attr({
            type: 'text/html',
            width: 640,
            height: 360,
            src: `${yt_baseURL}${yt_options}`,
            frameborder: 0,
            allow: 'encrypted-media; accelerometer; gyroscope;'
        })
        console.log('the final iframe element is: ', iFrame);
        $('.video-container').append(iFrame);
    }
}