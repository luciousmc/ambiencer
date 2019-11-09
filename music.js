
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
        console.log('the queryOptions object is: ', queryOptions);
        $.getJSON('https://www.googleapis.com/youtube/v3/search', queryOptions)
            .done((response)=>{
                console.log('the response is: ', response);
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
        console.log('the output of the query is: ', output);
        return output;
    }
    render(){}
}