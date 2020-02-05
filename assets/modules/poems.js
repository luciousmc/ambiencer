class PoemsAPI{
    constructor(){
        this.endpoint = 'http://poetrydb.org/lines,linecount/';
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
        let sectionContainer = $('.section-2');
        let loadingText = $('<h1>').addClass('loading-text');
        loadingText.text('Loading Poem...');
        sectionContainer.append(loadingText);

        const searchTerm = this.makeQuery(this.moodVariations[mood]) + ';30:abs';
       $.getJSON(this.endpoint + searchTerm)
                .done((result)=>{
                    $(loadingText).fadeOut(300);
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
    render(poem){
        const arrLen = poem.lines.length;
        let titleContainer = $('.section-2');
        let container = $('#poem-content-container');

        let poemTitleContainer = $('<div>').addClass('poem-title-container');
        let poemTitle = $('<h3>').addClass('poem-title').text(poem.title);
        poemTitle.after(`<p>by: ${poem.author}</p>`);
        poemTitleContainer.append(poemTitle);
        titleContainer.append(poemTitleContainer);

        let poemTextContainer = $('<div>').addClass('poem-text-container');
        for (let line = 0; line < arrLen; line++){
            let poemText = $('<p>').addClass('poem-text').text(poem.lines[line]);
            poemTextContainer.append(poemText);
        }
        container.append(poemTextContainer);
        poemTitleContainer.fadeIn(600)
        container.fadeIn(600);
    }
}