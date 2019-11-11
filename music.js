
class MusicPlayer {
    constructor(keys){
        this.moodVariations = {
            happy: ['happy', 'joyful'],
            sad: ['sad', 'depressing', 'instrumental sad'],
            romantic: ['love', 'romantic', 'sappy'],
            hype: ['hyphy', 'hype', 'party'],
            chill: ['lo-fi', 'relaxing'],
            motivated: ['workout', 'motivational', 'encouraging']
        }
        this.apiKey = keys.music;
    }
    getMusic(mood){
        const queryOptions = {
            part: 'snippet',
            fields: 'items(id, snippet(title, description))',
            type: 'playlist',
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
            output += moodWords[i] + ' songs || '; 
        }
        return output;
    }
    generateYoutubeOptions(videoArray){
        // returns a query string with youtube options
        const video = this.randomize(videoArray);
        console.log('the video is ', video);
        let output = '';

        const youtubeOptions = {
            listType: 'playlist', // load a playlist
            list: video.id.playlistId,// playlist ID
            fs: '0', // disable full screen button
            autoplay: '1', // autoplay video when it loads
            disablekb: '1', // disable keyboard functions on video
            iv_load_policy: '3', // disable any annotations a video may have
            color: 'white', // change progress bar color and disable modest branding
            frameborder: '0', // remove the border around the video
        }

        for (let prop in youtubeOptions){
            let val = youtubeOptions[prop];
            if (output === ''){
                output += `${prop}=${val}`;
            }
            output += `&${prop}=${val}`;
        }
        return output;
    }
    randomize(array){
        const randI = Math.floor(Math.random() * array.length) + 1;
        console.log('random number ', randI);
        return array[randI];
    }
    render(results){
        const YTBaseURL = 'http://www.youtube.com/embed?';

        let iFrame = $('<iframe>');
        iFrame.attr({
            width: 640,
            height: 480,
            src: `${YTBaseURL}${this.generateYoutubeOptions(results)}`
        })
        console.log('the final iframe element is: ', iFrame);
        $('.video-container').append(iFrame);
    }
}