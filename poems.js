class PoemsAPI{
    constructor(){
        this.endpoint = 'http://poetrydb.org/lines/';
        this.apiKey = null;
        this.moodVariations = {
            happy: ['happy', 'cheerful', 'laugh', 'smile'],
            sad: ['sad', 'gloomy', 'sorrow'],
            romantic: ['love', 'roses', 'sappy', 'romantic'],
            hype: ['exciting', 'hype', 'party', 'rave'],
            chill: ['lo-fi', 'bonfire', 'fireplace', 'cozy'],
            motivated: ['confident', 'motivational']
        }
    }
    getPoems(mood){
        const searchTerm = this.makeQuery(this.moodVariations[mood]);
       $.getJSON(this.endpoint + searchTerm)
                .done((result)=>{
                    console.log('the result of getPoems is: ', result);
                    const poemToDisplay = shared.randomize(result);
                    console.log('the poem to be displayed is: ', poemToDisplay);
                    this.render(poemToDisplay);
                })
                .fail((err)=>{
                    console.log('sorry there was an error: ', err);
                })
    }
    makeQuery(mood){
        let output = shared.randomize(mood);
        return output;
    }
    render(){}
}